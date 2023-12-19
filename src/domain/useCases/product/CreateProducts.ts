import { Asset } from "react-native-image-picker"
import { ProductRepositoryImpl } from "../../../data/repositories/ProductRepositoryImpl"
import { Product } from "../../entity/Product"

const { create } = new ProductRepositoryImpl()

export const CreateProductUseCase = async(Product:Product, file:Asset[]) =>{
    return await create(Product, file)

}