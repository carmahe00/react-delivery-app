
import { MercadoPagoRepositoryImpl } from "../../../data/repositories/MercadoPagoRepositoryImpl"

const { getInstallments } = new MercadoPagoRepositoryImpl()

export const GetInstallmentTypesMercadoPagoUseCase = async(bin:string, amount:number) =>{
    return await getInstallments(bin, amount)
}