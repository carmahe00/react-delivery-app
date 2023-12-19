import { ProductRepositoryImpl } from "../../../data/repositories/ProductRepositoryImpl";
import { Product } from "../../entity/product";
const { update } = new ProductRepositoryImpl()
export const UpdateProductUseCase =async (product:Product) => {
    return await update(product);
}