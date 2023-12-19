import { IdentificationType } from '../../domain/entity/IdentificationType';
import { MercadoPagoRepository } from '../../domain/repositories/MercadoPagoRepository';
import { PUBLIC_KEY } from '@env'
import { ApiMercadoPago } from '../source/remote/api/ApiMercadoPago';
import { CardTokenParams } from '../source/remote/models/CardTokenParams';
import { ResponseMercadoPagoCardToken } from '../source/remote/models/ResponseMercadoPagoCardToken';
import { ResponseMercadoPagoInstallments } from '../source/remote/models/ResponseMercadoPagoInstallments';
import { PaymentParams } from '../source/remote/models/PaymentParams';
import { ResponseAPIDelivery } from '../source/remote/models/ResponseApiDelivery';
import { ApiDelivery } from '../source/remote/api/ApiDelivery';
export class MercadoPagoRepositoryImpl implements MercadoPagoRepository{
    async createPayment(paymentParams: PaymentParams): Promise<ResponseAPIDelivery> {
        const { data } = await ApiDelivery.post<ResponseAPIDelivery>("/payments/create/mercado-pago", paymentParams)
        return data
    }
    
    async getInstallments(bin: string, amount: number): Promise<ResponseMercadoPagoInstallments> {
        const { data } = await ApiMercadoPago.get<ResponseMercadoPagoInstallments[]>(`/payment_methods/installments?bin=${bin}&amount=${amount}`)
        return data[0]
    }
    async createCardToken(cardTokenParams: CardTokenParams): Promise<ResponseMercadoPagoCardToken> {
        const { data } = await ApiMercadoPago.post<ResponseMercadoPagoCardToken>(`/card_tokens?public_key=${PUBLIC_KEY}`, cardTokenParams)
        return data
    }
    async getIdentification(): Promise<IdentificationType[]> {
        const { data } =  await ApiMercadoPago.get<IdentificationType[]>("/identification_types")
        return data
    }

}