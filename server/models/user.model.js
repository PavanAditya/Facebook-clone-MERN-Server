const { mongoose } = require('../database/mongoose.config');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: null
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    address: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    educationHistory: {
        type: String,
        default: null
    },
    professionalHistory: {
        type: String,
        default: null
    },
    online: {
        type: String,
        default: null
    },
    socketId: {
        type: String,
        default: null
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    accVerified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    lastUpdatedOn: {
        type: Date,
        default: null
    }
});

userSchema.plugin(uniqueValidator);

// ? Method for setting the backend params for a user
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.loginMethod === 'local') {
        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 10);
            user.confirmPassword = await bcrypt.hash(user.confirmPassword, 10);
            user.isActive = true;
        }
    }
    next();
});
const User = mongoose.model('users', userSchema);
module.exports = { userSchema: User };