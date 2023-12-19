
import { StripeRepositoryImpl } from "../../../data/repositories/StripeRepositoryImpl";
const { getIntent } = new StripeRepositoryImpl()
export const SendIntentUseCase = async () => {
    return await getIntent()
}