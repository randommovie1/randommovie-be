import nodemailer from "nodemailer";
import {_parseInt} from "../utils/math.utils";
import {stringToBoolean} from "../utils/boolean.utils";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: _parseInt(process.env.SMTP_PORT),
    secure: stringToBoolean(process.env.SMTP_SECURE),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export const mailOptions = {
    from: process.env.SMTP_HOST,
};