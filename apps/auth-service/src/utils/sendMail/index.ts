import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs'
import path from 'path'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP.HOST,
    port: Number(process.env.SMTP.PORT) || 587,
    service: process.env.SMTP.SERVER,
    auth: {

    }
})