/* eslint-disable no-console */
const express = require('express');

const authController = require('../controllers/auth.controllers');

// const auth = require('../middleware/auth.guard');
const router = express.Router();

// ? Basic Auth routes check
// ! {BASE_URL}/api/v1/auth/
router.get('/', (req, res) => {
    console.log('Basic Auth Route check');
    res.status(200).json({
        message: 'Success',
        data: 'Authentication is working without any error, Routes can be accessed.',
        status: 200
    });
});
// ? Basic Auth routes check

// ? Functional Auth Routes

// ! {BASE_URL}/api/v1/auth/register
router.post('/register', authController.signUp);

// // ! {BASE_URL}/api/v1/auth/signin/:username
// router.get('/signin', authController);

// // ! {BASE_URL}/api/v1/auth/logout
// router.get('/logout', authController);

// // ! {BASE_URL}/api/v1/auth/resetpassword
// router.get('/resetpassword', authController);

// // ! {BASE_URL}/api/v1/auth/forgotpassword
// router.get('/forgotpassword', authController);

// ? Functional Auth Routes

module.exports = {
    authRoutes: router
};
