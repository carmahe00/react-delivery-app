import { Product } from "../../../domain/entity/product"

import { ActionProductType, SoppingBagState, initialState } from "./ShoppingProvider"

type ProductAction =

    { type: ActionProductType.SENDINGTOBAG } |
    { type: ActionProductType.GETTOTAL } |
    { type: ActionProductType.INCREASEPRODUCT, payload: Product } |
    { type: ActionProductType.REMOVEPRODUCT, payload: Product } |
    { type: ActionProductType.GETSHOPPINGBAG, payload: Product[] } |
    { type: ActionProductType.ADDPRODUCT, payload: Product } |
    { type: ActionProductType.ERROR_PRODUCT, payload: string }
export const productReducer = (state: SoppingBagState, action: ProductAction): typeof initialState => {
    switch (action.type) {

        case ActionProductType.SENDINGTOBAG:
            return {
                ...state,
                isLoading: true
            }
        case ActionProductType.INCREASEPRODUCT:
            const index = state.products.findIndex((p) => p.id == action.payload.id)
            state.products[index].quantity = action.payload.quantity
            return {
                ...state,
                isLoading: false
            }
        case ActionProductType.ADDPRODUCT:
            let products = state.products
            products.push(action.payload)
            return {
                ...state,
                products,
                isLoading: false
            }
        case ActionProductType.REMOVEPRODUCT:
            const updatedProducts = state.products.filter(product => product.id !== action.payload.id);
            return {
                ...state,
                isLoading: false,
                products: updatedProducts
            }
        case ActionProductType.GETSHOPPINGBAG:
            return {
                ...state,
                isLoading: false,
                products: action.payload
            }
        case ActionProductType.ERROR_PRODUCT:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case ActionProductType.GETTOTAL:
            let totalPrice = 0;
            state.products.forEach(product => {
                totalPrice = totalPrice + (product.quantity! * product.price)
            })
            return {
                ...state,
                total: totalPrice,
                isLoading: false,
            }
        default:
            return initialState;
    }
}
