import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";
import { BadRequestError } from "../errors/bad-request-error";

export const validationEmail = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    if (!body.email)
        throw new BadRequestError("Email must be")
    const userFound = await User.findOne({
        where: {
            email: body.email
        }
    })
    if (userFound)
        throw new BadRequestError("Email already exist")
    next();
}