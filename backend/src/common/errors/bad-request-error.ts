import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError{
    statusCode = 400
    reason = 'Bad request'
    constructor(message:string){
        super();
        this.reason = message
        // Only because we are extending a built in class.
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors(){
        return [{message: this.reason}]
    }
}