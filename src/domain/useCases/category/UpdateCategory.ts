import { Asset } from "react-native-image-picker"
import { CategoryRepositoryImpl } from "../../../data/repositories/CategoryRepositoryImpl"
import { Category } from "../../entity/category"

const { update } = new CategoryRepositoryImpl()

export const UpdateCategoryUseCase = async(category:Category) =>{
    return await update(category)

}