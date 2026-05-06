import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { checkOtpRestricitons, sendOtp, trackOtpRequests, validateRegistrationData, verifyOtp } from "../utils/auth.helper";
import { ValidationError } from "@estore/error-handler-internal";
import prisma from "@estore/prisma";

export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validateRegistrationData(req.body, "buyer");
        const { name, email } = req.body;

        const exisitingUser = await prisma.users.findUnique({ where: { email } });

        if (exisitingUser) {
            return next(new ValidationError("User already exists with this email."));
        }

        await checkOtpRestricitons(email, next);
        await trackOtpRequests(email, next);

        await sendOtp(name, email, "user-activation-mail");

        res.status(200).json({
            success: true,
            message: `Please check your email: ${email} to verify your account!`
        });

    } catch (error) {
        return next(error);
    }
}

// verify user otp
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, otp, password, name } = req.body;
        if(!email || !otp || !password || !name) {
            return next(new ValidationError("Missing required fields."));
        }

        const exisitingUser = await prisma.users.findUnique({where: {email}}) 

        if(exisitingUser) {
            return next(new ValidationError("User already exists with this email."))
        }

        await verifyOtp(email, otp, next)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        return next(error);
    }
}