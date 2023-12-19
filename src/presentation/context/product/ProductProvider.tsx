import React, { ReactNode, useReducer } from 'react';

import { productReducer } from './ProductReducer';

import { Asset } from 'react-native-image-picker';
import { ProductContext } from './ProductContext';
import { Product } from '../../../domain/entity/product';
import { CreateProductUseCase } from '../../../domain/useCases/product/CreateProducts';
import { GetProductByCategoryUseCase } from '../../../domain/useCases/product/GetProductByCategory';
import { DeleteProductUseCase } from '../../../domain/useCases/product/DeleteProduct';
import { UpdateProductWithImageUseCase } from '../../../domain/useCases/product/UpdateProductWithImage';
import { UpdateProductUseCase } from '../../../domain/useCases/product/UpdateProduct';


export enum ActionProductType {
  SENDREQUEST = "SENDREQUEST",
  PRODUCTCREATE = "PRODUCTCREATE",
  PRODUCTUPDATE = "PRODUCTUPDATE",
  GETPRODUCTS = "GETPRODUCTS",
  DELETEPRODUCTS = "DELETEPRODUCTS",
  ERROR_PRODUCT = "ERROR_PRODUCT",
}

export interface ProductState {
  product?: Product
  products: Product[],
  errors?: [],
  isLoading: boolean
}
export const initialState: ProductState = {
  products: [],
  product: undefined,
  errors: undefined,
  isLoading: false
}



type ProductProviderProps = {
  children: ReactNode;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [state, dispatch] = useReducer(productReducer, initialState)
  
  const getProductsByCategory = async (id:string) => {
    try {
      dispatch({
        type: ActionProductType.SENDREQUEST
      })
      const data = await GetProductByCategoryUseCase(id)
      dispatch({
        type: ActionProductType.GETPRODUCTS,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionProductType.ERROR_PRODUCT,
        payload: error as []
      })
    }
  }

  const remove = async (id:string) => {
    try {
      dispatch({
        type: ActionProductType.SENDREQUEST
      })
      const data = await DeleteProductUseCase(id)
      dispatch({
        type: ActionProductType.DELETEPRODUCTS,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionProductType.ERROR_PRODUCT,
        payload: error as []
      })
    }
  }
 

  const createProduct = async (product: Product, file:Asset[]) => {
    try {
      dispatch({
        type: ActionProductType.SENDREQUEST
      })
      const data = await CreateProductUseCase(product, file)
      dispatch({
        type: ActionProductType.PRODUCTCREATE,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionProductType.ERROR_PRODUCT,
        payload: error as []
      })
    }
  }

  const updateWithImage = async (product: Product, file:Asset[]) => {
    try {
      dispatch({
        type: ActionProductType.SENDREQUEST
      })
      const data = await UpdateProductWithImageUseCase(product, file)
      dispatch({
        type: ActionProductType.PRODUCTUPDATE,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionProductType.ERROR_PRODUCT,
        payload: error as []
      })
    }
  }

  const update = async (product: Product) => {
    try {
      dispatch({
        type: ActionProductType.SENDREQUEST
      })
      const data = await UpdateProductUseCase(product)
      dispatch({
        type: ActionProductType.PRODUCTUPDATE,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionProductType.ERROR_PRODUCT,
        payload: error as []
      })
    }
  }
  
  return (
    <ProductContext.Provider value={{ state, createProduct, getProductsByCategory, remove, updateWithImage, update }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
