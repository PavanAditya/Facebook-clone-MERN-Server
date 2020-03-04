/* eslint-disable no-console */
const mongoose = require('mongoose');

// const dbUrl = 'mongodb+srv://pavanaditya_ms:adish789@sellmobiles-cluster-nwupp.mongodb.net/sellmobiles-db?retryWrites=true';
const dbUrl = 'mongodb+srv://pavanaditya:adish789@cluster0-dinas.mongodb.net/facebook-db?retryWrites=true&w=majority';
const urlParser = {
    useNewUrlParser: true
};

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(dbUrl, urlParser)
    .then(() => {
        console.log('DB Connected');
    })
    .catch((error) => {
        return error;
    });

module.exports = { mongoose };