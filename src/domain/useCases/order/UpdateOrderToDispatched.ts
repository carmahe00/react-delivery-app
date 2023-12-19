import { OrderRepositoryImpl } from "../../../data/repositories/OrderRepositoryImpl"
import { Order } from "../../entity/order"

const { updateToDispatched } = new OrderRepositoryImpl()

export const UpdateOrderToDispatchedUseCase = async(order:Order) =>{
    return await updateToDispatched(order)

}