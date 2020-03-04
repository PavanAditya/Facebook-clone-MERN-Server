const joi = require('joi');

// ? validation for signUp
const joiSchemaSignUpForm = joi.object().keys({
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
    confirmPassword: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
    mobileNumber: joi.string().regex(/^[0-9]{10}$/),
    email: joi.string().regex(/^[\w\\.?]+@\w+\.(com|net|edu)$/)
});

const schemaSignUpForm = (req) => joi.validate({
    password: req.password,
    confirmPassword: req.confirmPassword,
    mobileNumber: req.mobileNumber,
    email: req.email
}, joiSchemaSignUpForm);
// ? validation for signUp

module.exports = { schemaSignUpForm };