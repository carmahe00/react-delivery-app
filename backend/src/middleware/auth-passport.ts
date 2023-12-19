import { Request, Response } from "express";
import passport from "passport";

const auth = (req: Request, res: Response, next: Function) => {
    let responseObj = {
        statusCode: 0,
        errorMsg: "",
        data: {}
    }
    passport.authenticate('jwt', { session: false }, (err: any,
        user: Express.User ,
        info: any)=>{
            if(err){
                return next(err)
            }
            if(!user){
                responseObj.data = info.message
                responseObj.statusCode = 401
                responseObj.errorMsg = "user is not authenticated"
                return res.status(responseObj.statusCode).json(responseObj)
            }
            req.user = user
            next()

    })(req, res, next)
}

export default auth