import { ShoppingBagRepositoryImpl } from "../../../data/repositories/ShoppingBagRepository";
import { Product } from "../../entity/product";
const { save } = new ShoppingBagRepositoryImpl()
export const SaveShoppingBagUseCase = async (products:Product[]) => {
    return await save(products)
}