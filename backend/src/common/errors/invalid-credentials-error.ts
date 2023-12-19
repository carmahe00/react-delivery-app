import { CustomError } from "./custom-error";

export class InvalidCredentialsError extends CustomError{
    statusCode = 403
    reason = 'Invalid Credentials'
    constructor(message?:string){
        super();
        this.reason = message || 'Invalid Credentials'
        // Only because we are extending a built in class.
        Object.setPrototypeOf(this, InvalidCredentialsError.prototype)
    }

    serializeErrors(){
        return [{message: this.reason}]
    }
}