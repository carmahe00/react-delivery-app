import { OrderRepositoryImpl } from "../../../data/repositories/OrderRepositoryImpl"
import { Order } from "../../entity/order"

const { getByStatus } = new OrderRepositoryImpl()

export const GetByStatusUseCase = async(status:string) =>{
    return await getByStatus(status) as Order[]

}