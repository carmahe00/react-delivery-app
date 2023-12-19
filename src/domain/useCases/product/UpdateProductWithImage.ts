import { Asset } from "react-native-image-picker";
import { ProductRepositoryImpl } from "../../../data/repositories/ProductRepositoryImpl";
import { Product } from "../../entity/product";
const { updateWithImage } = new ProductRepositoryImpl()
export const UpdateProductWithImageUseCase =async (product:Product, file:Asset[]) => {
    return await updateWithImage(product, file);
}