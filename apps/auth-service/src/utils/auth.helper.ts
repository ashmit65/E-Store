import { ValidationError } from '@estore/error-handler';
import crypto from 'crypto';


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