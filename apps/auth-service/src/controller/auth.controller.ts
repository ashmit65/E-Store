
import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { checkOtpRestricitons, handleForgetPassword, sendOtp, trackOtpRequests, validateRegistrationData, verifyOtp } from "../utils/auth.helper";
import { AuthError, ValidationError } from "@estore/error-handler-internal";
import prisma from "@estore/prisma";
import jwt from "jsonwebtoken"
import { setCookies } from "../utils/cookies/setCookies";

export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validateRegistrationData(req.body, "buyer");
        const { name, email } = req.body;

        const exisitingUser = await prisma.users.findUnique({ where: { email } });

        if (exisitingUser) {
            return next(new ValidationError("User already exists with this email."));
        }

        await checkOtpRestricitons(email);
        await trackOtpRequests(email);

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

        await verifyOtp(email, otp)
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

// Login user
export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            throw new ValidationError("Email and Password are required.");
        }
        const user = await prisma.users.findUnique({where: {email}})

        if (!user) {
            throw new AuthError("User Doesn't Exists!.")
        }

        // verify password
        const isMatch = await bcrypt.compare(password, user.password!);
        if(!isMatch){
            throw new AuthError('Invalid Credentials!.');
        }

        // Generate JWT token
        const accessToken = jwt.sign({id: user.id, role: "user"},
            process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: "30m",
        }
        )

        // Generate refresh token
        const refreshToken = jwt.sign({id: user.id},
            process.env.ACCESS_REFRESH_SECRET as string,
            {
                expiresIn: "7d",
            }
        )

        // store the refresh and access token in an httpOnly secure cookie
        setCookies(res, "accessToken", accessToken)
        setCookies(res, "refreshToken", refreshToken)

        res.status(200).json({
            message: "Login successful!",
            user: { id: user.id, email: user.email, name: user.name },
        })
        
    }
    catch(error){
        return next(error);
    }
}

// user forgot password 
export const userForgotPassword = async(req: Request, res: Response, next: NextFunction)=>{
    await handleForgetPassword(req, res, next, "buyer");
}

// Reset User password
export const resetUserPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, newPassword} = req.body;

        if(!email || !newPassword)
            return next(new ValidationError("Email and new Password are required."))

        const user = await prisma.users.findUnique({where: {email}})

        if(!user) 
            return next(new ValidationError("User Not Found!"));

        //compare new password with the exisiting one
        const isSamePassword = await bcrypt.compare(newPassword, user.password!);
        if(isSamePassword)
            return next(new ValidationError("New password cannot be same as old password."))

        // hash the new password

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        await prisma.users.update({where:{email}, data:{password: hashedPassword}});

        res.status(200).json({
            success: true,
            message: "Password reset successful!"
        });
    } catch(error) {
        next(error);
    }
}