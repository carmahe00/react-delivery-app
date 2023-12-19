import { CustomError } from './custom-error';
export class ErrorStripe extends CustomError{
    statusCode = 400
    reason = 'Error Stripe'
    constructor(){
        super();
        // Only because we are extending a built in class.
        Object.setPrototypeOf(this, ErrorStripe.prototype)
    }

    serializeErrors(){
        return [{message: this.reason}]
    }
}