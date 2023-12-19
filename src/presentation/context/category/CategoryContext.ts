import { createContext } from "react"

import { CategoryState } from "./CategoryProvider"
import { Asset } from "react-native-image-picker"
import { Category } from "../../../domain/entity/category"

export interface CategoryCOntext {
    state?: CategoryState
    remove: (id:string)=>Promise<void>
    createCategory: (category: Category, file:Asset) => Promise<void>
    getAllCategory: () => Promise<void>
    update: (category: Category) => Promise<void>
    updateWithImage: (category: Category, file:Asset) => Promise<void>
}

export const CategoryContext = createContext<CategoryCOntext>({} as CategoryCOntext);