import { Order } from "../../../domain/entity/order"

import { ActionOrderType, OrderState, initialState } from "./OrderProvider"

type OrderAction =


    { type: ActionOrderType.GETORDERSPAID, payload: Order[] } |
    { type: ActionOrderType.GETORDERSDISPATCH, payload: Order[] } |
    { type: ActionOrderType.GETORDERSONTHEWAY, payload: Order[] } |
    { type: ActionOrderType.GETORDERSDELIVERED, payload: Order[] } |
    { type: ActionOrderType.SENDREQUEST } |
    { type: ActionOrderType.ERROR_ORDER, payload: [] }
export const OrderyReducer = (state: OrderState, action: OrderAction): typeof initialState => {
    switch (action.type) {


        case ActionOrderType.GETORDERSPAID:
            return {
                ...state,
                paid: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionOrderType.GETORDERSDISPATCH:
            return {
                ...state,
                dispatch: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionOrderType.GETORDERSONTHEWAY:
            return {
                ...state,
                onTheWay: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionOrderType.GETORDERSDELIVERED:
            return {
                ...state,
                delivered: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionOrderType.SENDREQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ActionOrderType.ERROR_ORDER:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return initialState;
    }
}
