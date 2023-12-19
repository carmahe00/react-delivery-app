import { ProductRepositoryImpl } from "../../../data/repositories/ProductRepositoryImpl"

const { getProductsByCategory } = new ProductRepositoryImpl()
export const GetProductByCategoryUseCase = async (id:string) =>{
    return await getProductsByCategory(id)
}