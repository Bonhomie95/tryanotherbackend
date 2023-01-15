import Mailer, { Transporter } from "nodemailer";
import { IEmailSender } from "../interfaces";

/**
 * @class EmailSender
 */
class EmailSender implements IEmailSender {

    transporter: Transporter;

    SENDER_EMAIL: string;

    MAIL_FROM_NAME = "HouseOfSounds";

    /**
     * @constructor
     * @param {string} SENDER_EMAIL 
     * @param {string} SENDER_PASSWORD 
     */
    constructor(SENDER_EMAIL: string, SENDER_PASSWORD: string) {
        const AUTH = {
            user: "mavericklladd@gmail.com",
            pass: "2BD6FAF501D02450F9787670DD4DA2188EC2"
        };

        this.transporter = Mailer.createTransport({
            host: "smtp.elasticemail.com",
            port: 2525,
            secure: false,
            auth: AUTH
        });

        this.SENDER_EMAIL = SENDER_EMAIL;
    }

    /**
     * @method send
     * @async
     * @param {string} toEmail 
     * @param {string} subject 
     * @param {string} message 
     */
    async send(toEmail: string, subject: string, message: string): Promise<void> {
        const FROM_MAIL_INFO = {
            name: this.MAIL_FROM_NAME,
            address: this.SENDER_EMAIL
        };

        this.transporter.sendMail({
            from: FROM_MAIL_INFO,
            to: toEmail,
            subject,
            text: message
        });
    }

}

export default EmailSender;