const { userSchema } = require('../models/user.model');
const mongo = require('mongodb');
const joiValidators = require('../helpers/joi.validators');

// ? Retrive All Users
const allUsers = async (req, res) => {
    try {
        const usersList = await userSchema.find({
            isActive: true
        });
        if (usersList) {
            res.status(200).send({
                data: {
                    message: 'All Users Retrieved successfully',
                    details: usersList
                },
                status: 200,
                message: 'Success'
            });
        } else {
            res.status(204).send({
                data: {
                    message: 'No Users Retrieved. DataBase is empty'
                },
                status: 204,
                message: 'No Data found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(503).send({
            data: {
                errorMessage: 'Users retrieval failed due to database error. Please try again.',
                errorMethod: 'Find Users process failed.',
                errorStack: '' + err
            },
            status: 503,
            message: 'Request Failed'
        });
    }
};
// ? Retrive All Users

// ? Retrive required user details with object Id
const userDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userSchema.findOne({
            _id: mongo.ObjectID(id),
            isActive: true
        });
        if (user) {
            res.status(200).send({
                data: {
                    message: 'User Retrieved successfully',
                    details: user
                },
                status: 200,
                message: 'Success'
            });
        } else {
            res.status(204).send({
                data: {
                    message: 'No Users Retrieved. No user found with this data.'
                },
                status: 204,
                message: 'No Data found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(503).send({
            data: {
                errorMessage: 'User retrieval failed due to database error. Please try again.',
                errorMethod: 'Find User process failed.',
                errorStack: '' + err
            },
            status: 503,
            message: 'Request Failed'
        });
    }
};
// ? Retrive required user details with object Id

// ? Update required user details with object Id
const updateUserDetails = async (req, res) => {

    const {
        error,
        value
    } = joiValidators.schemaForMyProfile(req);

    if (error) {
        res.status(503).json({
            message: 'Request Failed',
            data: {
                errorMessage: 'User updation request failed due to validation error. Please try again.',
                errorMethod: 'Request model mismatch. Schema validation failed'
            },
            status: 503
        });
        return;
    } else {
        try {
            const id = req.params.id;
            const updateUserReq = new userSchema(req.body);
            const updatedUser = await userSchema.findAndModify(
                {
                    _id: mongo.ObjectID(id),
                    isActive: true
                },
                {
                    ...updateUserReq,
                    lastUpdatedOn: Date.now()
                }, { new: true });
            if (updatedUser) {
                res.status(200).send({
                    data: {
                        message: 'User Updated successfully',
                        details: updatedUser
                    },
                    status: 200,
                    message: 'Success'
                });
            } else {
                res.status(204).send({
                    data: {
                        message: 'No Users Updated. No user found with this data.'
                    },
                    status: 204,
                    message: 'No Data found'
                });
            }
        } catch (err) {
            console.log(err);
            res.status(503).send({
                data: {
                    errorMessage: 'User update failed due to database error. Please try again.',
                    errorMethod: 'Find User process failed.',
                    errorStack: '' + err
                },
                status: 503,
                message: 'Request Failed'
            });
        }
    }
};
// ? Update required user details with object Id

// ? Delete required user details with object Id (mark isactive to false)
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await userSchema.findAndModify(
            {
                _id: mongo.ObjectID(id),
                isActive: true
            },
            {
                isActive: false,
                lastUpdatedOn: Date.now()
            }, { new: true });
        if (updatedUser) {
            res.status(200).send({
                data: {
                    message: 'User Deleted successfully'
                },
                status: 200,
                message: 'Success'
            });
        } else {
            res.status(204).send({
                data: {
                    message: 'No Users Deleted. No user found with this data.'
                },
                status: 204,
                message: 'No Data found'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(503).send({
            data: {
                errorMessage: 'User removal failed due to database error. Please try again.',
                errorMethod: 'Delete User process failed.',
                errorStack: '' + err
            },
            status: 503,
            message: 'Request Failed'
        });
    }
};
// ? Delete required user details with object Id (mark isactive to false)

module.exports = {
    allUsers,
    userDetails,
    updateUserDetails,
    deleteUser
};
