import { Order } from "../../../../domain/entity/order"


export interface PaymentParams {
    transaction_amount: number,
    token: string,
    description: string,
    installments: number,
    payment_method_id: string,
    issuer_id: string,
    order:Order,
    payer: {
        last_name: string,
        name:string,
        email: string,
        identification: Identification
    }
}

interface Identification {
        type: string,
        number: string
    
}