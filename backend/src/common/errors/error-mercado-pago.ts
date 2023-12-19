import { CustomError } from './custom-error';
export class ErrorMercadoPago extends CustomError{
    statusCode = 400
    reason = 'Error MercadoPago'
    constructor(){
        super();
        // Only because we are extending a built in class.
        Object.setPrototypeOf(this, ErrorMercadoPago.prototype)
    }

    serializeErrors(){
        return [{message: this.reason}]
    }
}