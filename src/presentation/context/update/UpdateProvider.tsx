import React, { ReactNode, useContext, useReducer } from 'react';

import { authReducer } from './UpdateReducer';

import { Asset } from 'react-native-image-picker';
import { User } from '../../../domain/entity/user';
import { UpdateContext } from './UpdateContext';
import { UpdateUser } from '../../../domain/useCases/user/UpdateUser';
import { UpdateWithImageUser } from '../../../domain/useCases/user/UpdateWithImageUser';
import { SaveUserCase } from '../../../domain/useCases/userLocal/SaveUserLocal';
import { ActionAuthType, AuthContext } from '../AuthProvider';


export enum ActionUpdateType {
  SENDREQUEST = "SENDREQUEST",
  UPDATEUSER = "UPDATEUSER",
  ERROR_USER_UPDATE = "ERROR_USER_UPDATE",
}

export interface UpdateState {
  user?: Partial<User>
  errors?: [],
  isLoading: boolean
}
export const initialState: UpdateState = {
  user: undefined,
  errors: undefined,
  isLoading: false
}



type UpdateProviderProps = {
  children: ReactNode;
};

const UpdateProvider = ({ children }: UpdateProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const { dispatch: dispatchAuth } = useContext(AuthContext);  
  
  
  const update = async (user: Partial<User>) => {
    try {
      dispatch({
        type: ActionUpdateType.SENDREQUEST
      })
      const data = await UpdateUser(user)
      dispatch({
        type: ActionUpdateType.UPDATEUSER,
        payload: data.data
      })
      data && await SaveUserCase(data.data)
      dispatchAuth({
        type: ActionAuthType.SIGNUP,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionUpdateType.ERROR_USER_UPDATE,
        payload: error as []
      })
    }
  }

  const updateWithImage = async (user: Partial<User>, file:Asset) => {
    try {
      dispatch({
        type: ActionUpdateType.SENDREQUEST
      })
      const data = await UpdateWithImageUser(user, file)
      dispatch({
        type: ActionUpdateType.UPDATEUSER,
        payload: data.data
      })
      data && await SaveUserCase(data.data)
      dispatchAuth({
        type: ActionAuthType.SIGNUP,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionUpdateType.ERROR_USER_UPDATE,
        payload: error as []
      })
    }
  }
  return (
    <UpdateContext.Provider value={{ state, update, updateWithImage }}>
      {children}
    </UpdateContext.Provider>
  );
};

export { UpdateContext, UpdateProvider };
