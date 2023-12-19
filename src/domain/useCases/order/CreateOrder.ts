import { OrderRepositoryImpl } from "../../../data/repositories/OrderRepositoryImpl"
import { Order } from "../../entity/order"

const { create } = new OrderRepositoryImpl()

export const CreateOrderUseCase = async(order:Order) =>{
    return await create(order)

}