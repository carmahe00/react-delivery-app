import { Address } from "./address";
import { Product } from "./product";
import { User } from "./user";

export interface Order{
    id?:string,
    idClient?:User,
    idDelivery?:Partial<User>,
    status?:string,
    lat?: number,
    lng?: number,
    createdAt?:string,
    idAddress:string,
    address?: Address,
    products: Product[],
    client?:User
    delivery?:User
}