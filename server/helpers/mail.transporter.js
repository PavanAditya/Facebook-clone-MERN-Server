// ! Node Mailer for sending mails to required users from our ADMIN mail id
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    // auth: {
    //     user: 'amarendrabaahubhali@outlook.com',
    //     pass: 'Devasena'
    // },
    port: 25,
    debug: true,
    logger: true,
    secure: false,
});

module.exports = {
    transporter: transporter
};