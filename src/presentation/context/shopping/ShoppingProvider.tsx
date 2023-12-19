import React, { ReactNode, useEffect, useReducer } from 'react';

import { productReducer } from './ShoppingReducer';
import { ShoppingBagContext } from './ShoppingContext';
import { Product } from '../../../domain/entity/product';
import { GetShoppingBagUseCase } from '../../../domain/useCases/shopping_bag/GetShoppingBag';
import { SaveShoppingBagUseCase } from '../../../domain/useCases/shopping_bag/SaveShoppingBag';


export enum ActionProductType {
  SENDINGTOBAG = "SENDINGTOBAG",
  INCREASEPRODUCT = "INCREASEPRODUCT",
  ADDPRODUCT = "ADDPRODUCT",
  REMOVEPRODUCT = "REMOVEPRODUCT",
  GETSHOPPINGBAG = "GETSHOPPINGBAG",
  GETTOTAL = "GETTOTAL",
  ERROR_PRODUCT = "ERROR_PRODUCT"
}

export interface SoppingBagState {
  error?: string,
  products: Product[],
  isLoading: boolean,
  total: number
}
export const initialState: SoppingBagState = {
  products: [],
  isLoading: false,
  total: 0.0
}



type ShoppingBagProviderProps = {
  children: ReactNode;
};

const ShoppingBagProvider = ({ children }: ShoppingBagProviderProps) => {
  const [state, dispatch] = useReducer(productReducer, initialState)
  const getShoppingBag = async () => {
    dispatch({
      type: ActionProductType.SENDINGTOBAG
    })
    const result = await GetShoppingBagUseCase()

    dispatch({
      type: ActionProductType.GETSHOPPINGBAG,
      payload: result
    })
    getTotal()
    return result
  }

  const saveItem = async (product: Product) => {
    const index = state.products.findIndex((p) => p.id == product.id)
    if (index == -1) {
      dispatch({
        type: ActionProductType.ADDPRODUCT,
        payload: product
      })
    } else {
      dispatch({
        type: ActionProductType.INCREASEPRODUCT,
        payload: product
      })
    }
    getTotal()
    await SaveShoppingBagUseCase(state.products)
  }

  const deleteItem = async (product: Product) => {
    const index = state.products.findIndex((p) => p.id == product.id)
    if (index !== -1) {
      dispatch({
        type: ActionProductType.REMOVEPRODUCT,
        payload: product
      })
      await SaveShoppingBagUseCase(state.products)
      await getTotal()
    }
  }

  const getTotal = async () => {
    dispatch({
      type: ActionProductType.GETTOTAL
    })
  }


  useEffect(() => {
    getShoppingBag()
  }, [])


  return (
    <ShoppingBagContext.Provider value={{ state, getShoppingBag, saveItem, deleteItem, getTotal }}>
      {children}
    </ShoppingBagContext.Provider>
  );
};

export { ShoppingBagContext, ShoppingBagProvider };
