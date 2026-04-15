import { NextFunction, Request, Response } from "express";
import { validateRegistrationData } from "../utils/auth.helper";
import { ValidationError } from "@estore/error-handler";



export const userRegistration = async (req:Request, res: Response, next: NextFunction) => {
    validateRegistrationData(req.body, "buyer");
    const {name, email} = req.body

    const exisitingUser = await prisma.users.findUnique({where: {email}})
    if(exisitingUser){
        return next(new ValidationError("User already exists with this email."))
    }

    await 
}