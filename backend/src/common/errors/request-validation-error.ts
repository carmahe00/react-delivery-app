import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error';




export class RequestValidatorError extends CustomError{
    statusCode = 400
    constructor(public errors: ValidationError[]){
        super();
        // Only because we are extending a built in class.
        Object.setPrototypeOf(this, RequestValidatorError.prototype)
    }

    serializeErrors(){
        return this.errors.map(err => ({
            message: err.msg, field: err.type
        }))
    }
}