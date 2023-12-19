import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";
import { Address } from "../entity/address";

export interface AddressRepository {
    create(address:Address):Promise<ResponseAPIDelivery>
    getById(): Promise<ResponseAPIDelivery>
}