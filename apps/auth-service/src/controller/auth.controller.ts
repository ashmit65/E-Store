import { NextFunction, Request, Response } from "express";
import { checkOtpRestricitons, sendOtp, trackOtpRequests, validateRegistrationData } from "../utils/auth.helper";
import { ValidationError } from "@estore/error-handler";
import prisma from "@estore/prisma";



export const userRegistration = async (req:Request, res: Response, next: NextFunction) => {
    validateRegistrationData(req.body, "buyer");
    const {name, email} = req.body

    const exisitingUser = await prisma.users.findUnique({where: {email}})
    if(exisitingUser){
        return next(new ValidationError("User already exists with this email."))
    }

    await checkOtpRestricitons(email, next) ;
    await trackOtpRequests(email, next);

    await sendOtp(name, email, "verification-email");

    res.status(200).json({
        success: true,
        message: `Please check your email: ${email} to verify your account!`
    })
}