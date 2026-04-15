import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs'
import path from 'path'

dotenv.config()

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    service: process.env.SMTP_SERVER,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})

//Render an EJS email template

export const renderTemplate = async (templateName: string, data: Record<string, any>) => {
    const templatePath = path.join(
        __dirname,
        process.cwd(),
        'auth-service',
        'src',
        'utils',
        'email-templates',
        `${templateName}.ejs`
    );
    return ejs.renderFile(templatePath, data);
}


// send an email using nodemailer 