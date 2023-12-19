import { createContext } from "react";
import { Product } from "../../../domain/entity/product";
import { SoppingBagState } from "./ShoppingProvider";

export interface ShoppingBagContext {
    state: SoppingBagState
    getShoppingBag: () => Promise<Product[]>
    saveItem: (product: Product) => Promise<void>
    getTotal: () => Promise<void>
    deleteItem: (product: Product) => Promise<void>
}

export const ShoppingBagContext = createContext<ShoppingBagContext>({} as ShoppingBagContext);