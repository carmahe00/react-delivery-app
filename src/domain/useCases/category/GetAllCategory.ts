import { CategoryRepositoryImpl } from "../../../data/repositories/CategoryRepositoryImpl"

const { getAll } = new CategoryRepositoryImpl()

export const getAllCategoryUseCase = async () => {
    return await getAll()
}