import { ResponseIntentStrapi } from "../../../data/source/remote/models/ResponseIntentStrapi"

import { ActionStripeType, StripeState, initialState } from "./StripeProvider"

type ProductAction =

    { type: ActionStripeType.SENDINGINTENT } |
    
    { type: ActionStripeType.GETINTENT, payload: ResponseIntentStrapi } 
export const stripeReducer = (state: StripeState, action: ProductAction): typeof initialState => {
    switch (action.type) {

        case ActionStripeType.SENDINGINTENT:
            return {
                ...state,
                isLoading: true
            }
        case ActionStripeType.GETINTENT:
            return {
                ...state,
                isLoading: false,
                intent: action.payload
            }
       
        default:
            return initialState;
    }
}
