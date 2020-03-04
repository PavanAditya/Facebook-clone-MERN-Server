const { transporter } = require('../helpers/mail.transporter');

const { userSchema } = require('../models/user.model');

const joiValidators = require('../helpers/joi.validators');

const signUp = async (req, res, next) => {

    if (req.headers['set_pass'] === req.headers['conf_pass']) {

        try {
            const userValue = new userSchema(req.body);
            userValue.password = req.headers['set_pass'];
            userValue.confirmPassword = req.headers['conf_pass'];
            userValue.loginMethod = 'local';
            const { error } = joiValidators.schemaSignUpForm(userValue);

            if (error) {
                const errorObj = new Error('Request body Validation of Schema failed');
                errorObj.status = 400;
                errorObj.message = 'Validation Error';
                errorObj.stack = error;
                next(errorObj);
                return;
            }

            // ? UserName and Email Id unique check
            const userEmail = req.body.email;
            const userName = req.body.userName;
            const findUserByUserEmail = await userSchema.findOne({
                email: userEmail
            });
            if (findUserByUserEmail) {
                res.status(405).json({
                    message: 'Duplicate Entry',
                    data: 'Email Id Already Registered ! You can directly login with your mail-id',
                    status: 405
                });
                return;
            }
            const findUserByUserName = await userSchema.findOne({
                userName: userName
            });
            if (findUserByUserName) {
                res.status(405).json({
                    message: 'Duplicate Entry',
                    data: 'Username already exists. Please try another username or do verify your account and login.',
                    status: 405
                });
                return;
            }
            // ? UserName and Email Id unique check

            const newUser = await userValue.save();
            if (!newUser) {
                res.status(503).json({
                    message: 'Request Failed',
                    data: {
                        errorMessage: 'User creation request failed due to database error. Please try again.',
                        errorMethod: 'Password ecryption process failed.'
                    },
                    status: 503
                });
                return;
            }
            const firstName = newUser.firstName;

            //! For sending mail
            const mailOptions = {
                from: 'amarendrabaahubhali@outlook.com',
                to: newUser.email,
                subject: 'Sign Up with FaceBuck',
                text: 'Congrats on your successful sign up with FaceBuk.',
                html: `Dear <b>${firstName},<b><br>

                <b>Thank you for registering with FaceBuk!</b>
                <br/> 
                <i>Amarendra Bahubali welcomes you 😋</i>
                We have received your registration . Thank you!.
                
                Thank you again for your registration. Hope you'll have a great time browsing your feed! 😁😁😁😁<br>
                
                Please verify your email account <a href="http://localhost:8080/verify">here</a> so that you can start browsing FaceBuk.<br>
                
                Regards,<br>
                
                Amarendra Baahubali<br>
                CEO - FaceBuk<br>
                Facebook: <a href="https://www.facebook.com/pavanaditya.ms">Owner</a><br>
                (123) 456-7890<br>
                `
            };
            await transporter.sendMail(mailOptions, (error, res) => {
                if (error) {
                    console.log(error, 'err');
                    return error;
                }
                console.log('res', res, 'res');
            });
            res.status(200).json({
                data: {
                    message: 'User Successfully Created',
                    username: newUser.userName
                },
                status: 200,
                message: 'Success'
            });
        } catch (error) {
            res.status(503).json({
                message: 'Request Failed',
                data: {
                    errorMessage: 'User creation request failed due to database error. Please try again.',
                    errorMethod: 'User creation process failed.',
                    errorStack: '' + error
                },
                status: 503
            });
        }
    } else {
        res.status(401).json({
            message: 'Passwords Mismatch',
            data: 'Password and confirm password doesn\'t match.',
            status: 401
        });
    }
};

module.exports = {
    signUp
};