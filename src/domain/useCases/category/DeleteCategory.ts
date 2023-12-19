
import { CategoryRepositoryImpl } from "../../../data/repositories/CategoryRepositoryImpl"

const { remove } = new CategoryRepositoryImpl()

export const DeleteCategoryUseCase = async(id:string) =>{
    return await remove(id)

}