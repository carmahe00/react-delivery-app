
import { MercadoPagoRepositoryImpl } from "../../../data/repositories/MercadoPagoRepositoryImpl"
import { CardTokenParams } from "../../../data/source/remote/models/CardTokenParams"

const { createCardToken } = new MercadoPagoRepositoryImpl()

export const CreateCardTokenMercadoPagoUseCase = async(cardTokenParams: CardTokenParams) =>{
    return await createCardToken(cardTokenParams)
}