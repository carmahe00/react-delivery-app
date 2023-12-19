import { Category } from "../../../domain/entity/category"

import { ActionCategoryType, CategoryState, initialState } from "./CategoryProvider"

type CategoryAction =

    { type: ActionCategoryType.CATEGORYCREATE, payload: Category } |
    { type: ActionCategoryType.CATEGORYUPDATE, payload: Category } |
    
    { type: ActionCategoryType.GETCATEGORIES, payload: Category[] } |
    { type: ActionCategoryType.SENDREQUEST } |
    { type: ActionCategoryType.DELETECATEGORIES, payload: string } |
    { type: ActionCategoryType.ERROR_CATEGORY, payload: [] }
export const categoryReducer = (state: CategoryState, action: CategoryAction): typeof initialState => {
    switch (action.type) {

        case ActionCategoryType.CATEGORYCREATE:
            return {
                ...state,
                category: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionCategoryType.GETCATEGORIES:
            return {
                ...state,
                categories: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionCategoryType.SENDREQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ActionCategoryType.DELETECATEGORIES:
            const deletedCategoryId = action.payload;
            const updatedCategories = state.categories.filter(category => category.id !== deletedCategoryId);
            return {
                ...state,
                categories: updatedCategories,
                isLoading: false,
                errors: undefined,
            }
        case ActionCategoryType.CATEGORYUPDATE:
            const updatedCategory = action.payload; // Assuming the payload is the updated category object
            // Find the index of the updated category in the categories array
            const updatedCategoryIndex = state.categories.findIndex(category => category.id === updatedCategory.id);
            // Create a new array with the updated category at the corresponding index
            const updatedCategoriesArray = [...state.categories];
            updatedCategoriesArray[updatedCategoryIndex] = updatedCategory;
             return {
                ...state,
                categories: updatedCategoriesArray,
                isLoading: false
             }
        case ActionCategoryType.ERROR_CATEGORY:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return initialState;
    }
}
