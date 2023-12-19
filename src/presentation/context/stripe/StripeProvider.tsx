import React, { ReactNode, useReducer } from 'react';

import { stripeReducer } from './StripeReducer';
import { StripeContext } from './StripeContext';
import { ResponseIntentStrapi } from '../../../data/source/remote/models/ResponseIntentStrapi';
import { SendIntentUseCase } from '../../../domain/useCases/stripe/SendIntent';


export enum ActionStripeType {
  SENDINGINTENT = "SENDINGINTENT",
  GETINTENT = "GETINTENT",
}

export interface StripeState {
  error?: string,
  intent?: ResponseIntentStrapi,
  isLoading: boolean,
}
export const initialState: StripeState = {
  isLoading: false,
}



type StripeProviderProps = {
  children: ReactNode;
};

const StripePaymentProvider = ({ children }: StripeProviderProps) => {
  const [state, dispatch] = useReducer(stripeReducer, initialState)
  const sendingIntent = async () => {
    dispatch({
      type: ActionStripeType.SENDINGINTENT
    })
    const result = await SendIntentUseCase() as ResponseIntentStrapi

    dispatch({
      type: ActionStripeType.GETINTENT,
      payload: result
    })
  }

  return (
    <StripeContext.Provider value={{ state, sendingIntent }}>
      {children}
    </StripeContext.Provider>
  );
};

export { StripeContext, StripePaymentProvider };
