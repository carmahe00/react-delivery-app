import { Asset } from "react-native-image-picker"
import { CategoryRepositoryImpl } from "../../../data/repositories/CategoryRepositoryImpl"
import { Category } from "../../entity/category"

const { register } = new CategoryRepositoryImpl()

export const CreateCategoryUseCase = async(category:Category, file:Asset) =>{
    return await register(category, file)

}