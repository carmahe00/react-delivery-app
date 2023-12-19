import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";

export interface StripeRepositoryRespository{
    
    getIntent():Promise<ResponseAPIDelivery>
}