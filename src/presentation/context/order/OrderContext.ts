import { createContext } from "react"

import { OrderState } from "./OrderProvider"
import { Order } from "../../../domain/entity/order"

export interface OrderCOntext {
    state: OrderState
    
    getAllByStatus: (status:'PAID'| 'DISPATCH'| 'ON-THE-WAY'| 'DELIVERED') => Promise<void>
    getAllByDeliveryStatus: (idDelivery:string, status:'PAID'| 'DISPATCH'| 'ON-THE-WAY'| 'DELIVERED') => Promise<void>
    getAllByClientStatus: (idClient:string, status:'PAID'| 'DISPATCH'| 'ON-THE-WAY'| 'DELIVERED') => Promise<void>
    updateToDelivered: (order:Order)=> Promise<any>
}

export const OrderContext = createContext<OrderCOntext>({} as OrderCOntext);