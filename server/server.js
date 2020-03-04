/* eslint-disable no-console */
// ? node_modules requires
const express = require('express');
const bodyParser = require('body-parser');
// ? node_modules requires

// ? app route requires
const { authRoutes } = require('./routes/auth.routes');
const { userRoutes } = require('./routes/user.routes');
// ? app route requires

// ? Configs needed
const PORT = process.env.PORT || 9000;
const app = express();
// eslint-disable-next-line no-unused-vars
const httpServer = app.listen(PORT, () => { });
// ? Configs needed

app.use(bodyParser.json());

// ? Test route for backend working check
// !{BASE_URL}
app.get('/', (req, res) => {
    console.log('Hello Facebook Users');
    res.status(200).json({
        message: 'Success',
        data: 'Hello Pavan Aditya\'s Facebook Users. Your backend is working',
        status: 200
    });
});
// ? Test route for backend working check

// ? Auth routes
// ! {BASE_URL}/api/v1/auth
app.use('/api/v1/auth', authRoutes);
// ? Auth routes

// ? User routes
// ! {BASE_URL}/api/v1/user
app.use('/api/v1/user', userRoutes);
// ? User routes