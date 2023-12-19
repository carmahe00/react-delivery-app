import { OrderRepositoryImpl } from "../../../data/repositories/OrderRepositoryImpl"

const { getByClientAndStatus } = new OrderRepositoryImpl()

export const GetClientByStatusUseCase = async(idClient: string, status: string) =>{
    return await getByClientAndStatus(idClient, status)
}