import { Asset } from "react-native-image-picker"
import { CategoryRepositoryImpl } from "../../../data/repositories/CategoryRepositoryImpl"
import { Category } from "../../entity/category"

const { updateWithImage } = new CategoryRepositoryImpl()

export const UpdateCategoryWithImageUseCase = async(category:Category, file:Asset) =>{
    return await updateWithImage(category, file)

}