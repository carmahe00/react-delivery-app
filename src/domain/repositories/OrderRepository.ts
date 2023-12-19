import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";
import { Order } from "../entity/order";

export interface OrderRepository{
    create(order:Order):Promise<ResponseAPIDelivery>
    getByStatus(status:string):Promise<ResponseAPIDelivery>
    getByDeliveryAndStatus(idDelivery:string, status:string):Promise<ResponseAPIDelivery>
    getByClientAndStatus(idClient:string, status:string):Promise<ResponseAPIDelivery>
    updateToDispatched(order:Order):Promise<ResponseAPIDelivery>
    updateToOnTheWay(order:Order):Promise<ResponseAPIDelivery>
    updateToDelivered(order:Order):Promise<ResponseAPIDelivery>
}