import React, { ReactNode, useReducer } from 'react';

import { OrderyReducer } from './OrderReducer';
import { OrderContext } from './OrderContext';
import { Order } from '../../../domain/entity/order';
import { GetByStatusUseCase } from '../../../domain/useCases/order/GetByStatus';
import { GetDeliveryByStatusUseCase } from '../../../domain/useCases/order/GetDeliveryByStatus';
import { UpdateOrderToDeliveredUseCase } from '../../../domain/useCases/order/UpdateOrderToDelivered';
import { GetClientByStatusUseCase } from '../../../domain/useCases/order/GetClientByStatus';


export enum ActionOrderType {
  SENDREQUEST = "SENDREQUEST",
  GETORDERSPAID = "GETORDERSPAID",
  GETORDERSDISPATCH = "GETORDERSDISPATCH",
  GETORDERSONTHEWAY = "GETORDERSONTHEWAY",
  GETORDERSDELIVERED = "GETORDERSDELIVERED",
  ERROR_ORDER = "ERROR_ORDER",
}

export interface OrderState {
  paid: Order[],
  dispatch: Order[],
  onTheWay: Order[],
  delivered: Order[],
  errors?: [],
  isLoading: boolean
}
export const initialState: OrderState = {
  paid: [],
  dispatch: [],
  onTheWay: [],
  delivered: [],
  errors: undefined,
  isLoading: false
}



type OrderProviderProps = {
  children: ReactNode;
};

const OrderProvider = ({ children }: OrderProviderProps) => {
  const [state, dispatch] = useReducer(OrderyReducer, initialState)

  const getAllByStatus = async (status: 'PAID' | 'DISPATCH' | 'ON-THE-WAY' | 'DELIVERED') => {
    try {
      dispatch({
        type: ActionOrderType.SENDREQUEST
      })

      const data = await GetByStatusUseCase(status)

      switch (status) {
        case "PAID":
          dispatch({
            type: ActionOrderType.GETORDERSPAID,
            payload: data
          })
          break;
        case "DISPATCH":
          dispatch({
            type: ActionOrderType.GETORDERSDISPATCH,
            payload: data
          })
          break;
        case "ON-THE-WAY":

          dispatch({
            type: ActionOrderType.GETORDERSONTHEWAY,
            payload: data
          })

          break;
        case "DELIVERED":
          dispatch({
            type: ActionOrderType.GETORDERSDELIVERED,
            payload: data
          })
          break;

        default:
          break;
      }

    } catch (error) {
      dispatch({
        type: ActionOrderType.ERROR_ORDER,
        payload: error as []
      })
    }
  }

  const getAllByDeliveryStatus = async (idDelivery:string, status: 'PAID' | 'DISPATCH' | 'ON-THE-WAY' | 'DELIVERED') => {
    try {
      dispatch({
        type: ActionOrderType.SENDREQUEST
      })

      const data = await GetDeliveryByStatusUseCase(idDelivery, status)

      switch (status) {
        case "PAID":
          dispatch({
            type: ActionOrderType.GETORDERSPAID,
            payload: data
          })
          break;
        case "DISPATCH":
          dispatch({
            type: ActionOrderType.GETORDERSDISPATCH,
            payload: data
          })
          break;
        case "ON-THE-WAY":

          dispatch({
            type: ActionOrderType.GETORDERSONTHEWAY,
            payload: data
          })

          break;
        case "DELIVERED":
          dispatch({
            type: ActionOrderType.GETORDERSDELIVERED,
            payload: data
          })
          break;

        default:
          break;
      }

    } catch (error) {
      dispatch({
        type: ActionOrderType.ERROR_ORDER,
        payload: error as []
      })
    }
  }

  const getAllByClientStatus = async (idClient:string, status: 'PAID' | 'DISPATCH' | 'ON-THE-WAY' | 'DELIVERED') => {
    try {
      dispatch({
        type: ActionOrderType.SENDREQUEST
      })

      const data = await GetClientByStatusUseCase(idClient, status)

      switch (status) {
        case "PAID":
          dispatch({
            type: ActionOrderType.GETORDERSPAID,
            payload: data
          })
          break;
        case "DISPATCH":
          dispatch({
            type: ActionOrderType.GETORDERSDISPATCH,
            payload: data
          })
          break;
        case "ON-THE-WAY":

          dispatch({
            type: ActionOrderType.GETORDERSONTHEWAY,
            payload: data
          })

          break;
        case "DELIVERED":
          dispatch({
            type: ActionOrderType.GETORDERSDELIVERED,
            payload: data
          })
          break;

        default:
          break;
      }

    } catch (error) {
      dispatch({
        type: ActionOrderType.ERROR_ORDER,
        payload: error as []
      })
    }
  }

  const updateToDelivered = async (order:Order) => {
    return await UpdateOrderToDeliveredUseCase(order);
    
  }
  return (
    <OrderContext.Provider value={{ state, getAllByStatus, getAllByDeliveryStatus, updateToDelivered, getAllByClientStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
