const express = require('express');

const userController = require('../controllers/user.controllers');

const router = express.Router();

// ? Basic User routes check
router.get('/', (req, res) => {
    console.log('Basic User Route check');
    res.status(200).json({
        message: 'Success',
        data: 'User Routing is working without any error, Routes can be accessed.',
        status: 200
    });
});
// ? Basic User routes check

// ? Functional User routes

// ? Get All Users
// ! {BASE_URL}/api/v1/user/all
router.get('/all', userController.allUsers);

// ? Get a Particular User with user id
// ! {BASE_URL}/api/v1/user/:id
router.get('/:id', userController.userDetails);

// ? Update a Particular User with user id
// ! {BASE_URL}/api/v1/user/:id
router.put('/:id', userController.updateUserDetails);

// ? Delete a Particular User with user id
// ! {BASE_URL}/api/v1/user/delete/:id
router.put('/delete/:id', userController.deleteUser);

// ? Functional User routes

module.exports = { userRoutes: router };