const nodemailer = require('nodemailer');
import config from "../config"


module.exports.transport = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: 2525,
    secure: false, 
    auth: {
        user: config.SMTP_USER, 
        pass: config.SMTP_PASSWORD
    }
});