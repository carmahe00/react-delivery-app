import { OrderRepositoryImpl } from "../../../data/repositories/OrderRepositoryImpl"
import { Order } from "../../entity/order"

const { updateToDelivered } = new OrderRepositoryImpl()

export const UpdateOrderToDeliveredUseCase = async(order:Order) =>{
    return await updateToDelivered(order)

}