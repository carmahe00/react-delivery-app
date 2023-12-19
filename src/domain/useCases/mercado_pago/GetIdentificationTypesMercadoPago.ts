
import { MercadoPagoRepositoryImpl } from "../../../data/repositories/MercadoPagoRepositoryImpl"

const { getIdentification } = new MercadoPagoRepositoryImpl()

export const GetIdentificationTypesMercadoPagoUseCase = async() =>{
    return await getIdentification()

}