
import { MercadoPagoRepositoryImpl } from "../../../data/repositories/MercadoPagoRepositoryImpl"
import { PaymentParams } from "../../../data/source/remote/models/PaymentParams"

const { createPayment } = new MercadoPagoRepositoryImpl()

export const CreatePaymentMercadoPagoUseCase = async(paymentParams: PaymentParams) =>{
    return await createPayment(paymentParams)
}