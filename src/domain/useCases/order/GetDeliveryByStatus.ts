import { OrderRepositoryImpl } from "../../../data/repositories/OrderRepositoryImpl"

const { getByDeliveryAndStatus } = new OrderRepositoryImpl()

export const GetDeliveryByStatusUseCase = async(idDelivery: string, status: string) =>{
    return await getByDeliveryAndStatus(idDelivery, status)

}