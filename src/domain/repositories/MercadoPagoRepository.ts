import { IdentificationType } from "../entity/IdentificationType";
import { CardTokenParams } from '../../data/source/remote/models/CardTokenParams';
import { ResponseMercadoPagoCardToken } from '../../data/source/remote/models/ResponseMercadoPagoCardToken';
import { ResponseMercadoPagoInstallments } from "../../data/source/remote/models/ResponseMercadoPagoInstallments";
import { PaymentParams } from "../../data/source/remote/models/PaymentParams";
import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";

export interface MercadoPagoRepository {
    getIdentification(): Promise<IdentificationType[]>
    getInstallments(bin: string, amount: number): Promise<ResponseMercadoPagoInstallments>
    createCardToken(cardTokenParams: CardTokenParams): Promise<ResponseMercadoPagoCardToken>
    createPayment(paymentParams:PaymentParams):Promise<ResponseAPIDelivery>
}