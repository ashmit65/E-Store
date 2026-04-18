import { ValidationError } from '@estore/error-handler';
import crypto from 'crypto';
import { NextFunction } from 'express';


const emailRegex = /^[^\s@]+@[^/s@]+\.[^\s@]+$/;

export const validateRegistrationData = (data: any, userType: "seller" | "buyer") => {
    const {name, email, password, phone_number, country} = data;

    if(!name || !password || !email || (userType==="seller" && (!phone_number || !country))){
        throw new ValidationError("Missing required fields")
    }

    if(!emailRegex.test(email)) {
        throw new ValidationError("Invalid email format")
    }
}

export const checkOtpRestricitons = async(email:string, next:NextFunction) => {
    if(await redis.get(`otp_lock :${email}`)) {
        return next(
            new ValidationError('Account locked due to multiple failed attempts! Try again after 30 minutes')
        )
    }
    if(await redis.get(`otp_spam_lock: ${email}`)) {
        return next(
            new ValidationError('Too many OTP requests! Please try again after 1 hour')
        )
    }
    if(await redis.get(`otp_cooldown:${email}`)) {
        return next(
            new ValidationError('Please wait 60 seconds before requesting another OTP')
        )
    }
}

export const trackOtpRequests = async(email: string, next: NextFunction) => {
    const otpRequestKey = `otp_request_count:${email}`
    let otpRequests = parseInt((await redis.get(otpRequestKey)) || "0");

    if(otpRequests >= 2) {
        await redis.get(`otp_spam_lock:${email}`, "locked", "EX", 3600) 
    }
}

export const sendOtp = async (name: string, email:string, template: string) => {
    const otp = crypto.randomInt(1000, 9999).toString();
    await sendEmail(email, "Verify Your Email", template, {name, otp});
    await redis.set(`OTP:${email}`, otp, 'EX', 300);
    await redis.set(`otp_cooldown:${email}`, 'true', 'EX', 60);
}