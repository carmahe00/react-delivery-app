import { Product } from "../../../domain/entity/product"

import { ActionProductType, ProductState, initialState } from "./ProductProvider"

type ProductAction =

    { type: ActionProductType.PRODUCTCREATE, payload: Product } |
    { type: ActionProductType.PRODUCTUPDATE, payload: Product } |
    
    { type: ActionProductType.GETPRODUCTS, payload: Product[] } |
    { type: ActionProductType.SENDREQUEST } |
    { type: ActionProductType.DELETEPRODUCTS, payload: string } |
    { type: ActionProductType.ERROR_PRODUCT, payload: [] }
export const productReducer = (state: ProductState, action: ProductAction): typeof initialState => {
    switch (action.type) {

        case ActionProductType.PRODUCTCREATE:
            return {
                ...state,
                product: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionProductType.GETPRODUCTS:
            return {
                ...state,
                products: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionProductType.SENDREQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ActionProductType.DELETEPRODUCTS:
            const deletedProductId = action.payload;
            const updatedProducts = state.products.filter(product => product.id !== deletedProductId);
            return {
                ...state,
                products: updatedProducts,
                isLoading: false,
                errors: undefined,
            }
        case ActionProductType.PRODUCTUPDATE:
            const updatedProduct = action.payload; // Assuming the payload is the updated product object
            // Find the index of the updated product in the categories array
            const updatedProductIndex = state.products.findIndex(product => product.id === updatedProduct.id);
            // Create a new array with the updated product at the corresponding index
            const updatedProductsArray = [...state.products];
            updatedProductsArray[updatedProductIndex] = updatedProduct;
             return {
                ...state,
                products: updatedProductsArray,
                isLoading: false
             }
        case ActionProductType.ERROR_PRODUCT:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return initialState;
    }
}
