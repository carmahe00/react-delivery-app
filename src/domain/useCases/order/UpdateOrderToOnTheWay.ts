import { OrderRepositoryImpl } from "../../../data/repositories/OrderRepositoryImpl"
import { Order } from "../../entity/order"

const { updateToOnTheWay } = new OrderRepositoryImpl()

export const UpdateOrderToOnTheWayUseCase = async(order:Order) =>{
    return await updateToOnTheWay(order)

}