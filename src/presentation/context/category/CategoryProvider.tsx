import React, { ReactNode, useReducer } from 'react';

import { categoryReducer } from './CategoryReducer';

import { Asset } from 'react-native-image-picker';
import { CategoryContext } from './CategoryContext';
import { Category } from '../../../domain/entity/category';
import { CreateCategoryUseCase } from '../../../domain/useCases/category/CreateCategory';
import { getAllCategoryUseCase } from '../../../domain/useCases/category/GetAllCategory';
import { DeleteCategoryUseCase } from '../../../domain/useCases/category/DeleteCategory';
import { UpdateCategoryUseCase } from '../../../domain/useCases/category/UpdateCategory';
import { UpdateCategoryWithImageUseCase } from '../../../domain/useCases/category/UpdateCategoryWithImage';


export enum ActionCategoryType {
  SENDREQUEST = "SENDREQUEST",
  CATEGORYCREATE = "CATEGORYCREATE",
  CATEGORYUPDATE = "CATEGORYUPDATE",
  GETCATEGORIES = "GETCATEGORIES",
  DELETECATEGORIES = "DELETECATEGORIES",
  ERROR_CATEGORY = "ERROR_CATEGORY",
}

export interface CategoryState {
  category?: Category
  categories: Category[],
  errors?: [],
  isLoading: boolean
}
export const initialState: CategoryState = {
  categories: [],
  category: undefined,
  errors: undefined,
  isLoading: false
}



type CategoryProviderProps = {
  children: ReactNode;
};

const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState)
  
 

  const createCategory = async (category: Category, file:Asset) => {
    try {
      dispatch({
        type: ActionCategoryType.SENDREQUEST
      })
      const data = await CreateCategoryUseCase(category, file)
      dispatch({
        type: ActionCategoryType.CATEGORYCREATE,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionCategoryType.ERROR_CATEGORY,
        payload: error as []
      })
    }
  }
  const remove =async (id:string)=>{
    try {
      dispatch({
        type: ActionCategoryType.SENDREQUEST
      })
      const data = await DeleteCategoryUseCase(id)
      data.success && dispatch({
        type: ActionCategoryType.DELETECATEGORIES,
        payload: id
      })
    } catch (error) {
      dispatch({
        type: ActionCategoryType.ERROR_CATEGORY,
        payload: error as []
      })
    }
  }

  const getAllCategory =async () => {
    try {
      dispatch({
        type: ActionCategoryType.SENDREQUEST
      })
      const data = await getAllCategoryUseCase()
      dispatch({
        type: ActionCategoryType.GETCATEGORIES,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionCategoryType.ERROR_CATEGORY,
        payload: error as []
      })
    }
  }

  const update = async (catgeory: Category) => {
    try {
      dispatch({
        type: ActionCategoryType.SENDREQUEST
      })
      const data = await UpdateCategoryUseCase(catgeory)
      dispatch({
        type: ActionCategoryType.CATEGORYUPDATE,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionCategoryType.ERROR_CATEGORY,
        payload: error as []
      })
    }
  }

  const updateWithImage = async (user: Category, file:Asset) => {
    try {
      dispatch({
        type: ActionCategoryType.SENDREQUEST
      })
      const data = await UpdateCategoryWithImageUseCase(user, file)
      dispatch({
        type: ActionCategoryType.CATEGORYUPDATE,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionCategoryType.ERROR_CATEGORY,
        payload: error as []
      })
    }
  }
  return (
    <CategoryContext.Provider value={{ state,remove,update, updateWithImage, createCategory, getAllCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryContext, CategoryProvider };
