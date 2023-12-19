import { createContext } from "react"

import { ProductState } from "./ProductProvider"
import { Asset } from "react-native-image-picker"
import { Product } from "../../../domain/entity/product"

export interface ProductContext {
    state?: ProductState
    createProduct: (product: Product, file: Asset[]) => Promise<void>
    getProductsByCategory: (id: string) => Promise<void>
    remove: (id: string) => Promise<void>
    update: (product: Product) => Promise<void>
    updateWithImage: (product: Product, file: Asset[]) => Promise<void>
}

export const ProductContext = createContext<ProductContext>({} as ProductContext);