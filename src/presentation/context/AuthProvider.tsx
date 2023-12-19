import React, { createContext, useState, ReactNode, useReducer } from 'react';
import { User } from '../../domain/entity/user';
import { authReducer } from './AuthReducer';
import { AuthContext } from './AuthContext';
import { RegisterAuthUseCase } from '../../domain/useCases/auth/RegisterAuth';
import { LoginAuthUseCase } from '../../domain/useCases/auth/LoginAuth';
import { useUserLocal } from '../hooks/userLocalStorage';
import { SaveUserCase } from '../../domain/useCases/userLocal/SaveUserLocal';
import { DeleteUserCase } from '../../domain/useCases/userLocal/DeleteUserLocal';
import { Asset } from 'react-native-image-picker';
import { RegisterAuthWithImage } from '../../domain/useCases/auth/RegisterAuthWithImage';
import { Address } from '../../domain/entity/address';

export enum ActionAuthType {
  SENDREQUEST = "SENDREQUEST",
  SIGNUP = "SIGNUP",
  SIGNIN = "SIGNIN",
  SIGNOUT = "SIGNOUT",
  CURRENT_USER = "CURRENT_USER",
  SET_ADDRESS = "SET_ADDRESS",
  ERROR_USER = "ERROR_USER",
}

export interface AuthState {
  user?: User
  errors?: [],
  isLoading: boolean
}
export const initialState: AuthState = {
  user: undefined,
  errors: undefined,
  isLoading: false
}



type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const currentUser = async () => {
    dispatch({
      type: ActionAuthType.SENDREQUEST
    })
    const { user } = useUserLocal()
    user && dispatch({
      type: ActionAuthType.CURRENT_USER,
      payload: user
    })
  }
  const signIn = async (email: string, password: string) => {
    try {
      dispatch({
        type: ActionAuthType.SENDREQUEST
      })
      const data = await LoginAuthUseCase(email, password)
      data && await SaveUserCase(data.data)
      dispatch({
        type: ActionAuthType.SIGNIN,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionAuthType.ERROR_USER,
        payload: error as []
      })
    }
  }
  const signOut = async () => {
    dispatch({
      type: ActionAuthType.SENDREQUEST
    })
    dispatch({
      type: ActionAuthType.SIGNOUT
    })
    await DeleteUserCase()
  }
  const signUp = async (user: User) => {
    try {
      dispatch({
        type: ActionAuthType.SENDREQUEST
      })
      const data = await RegisterAuthUseCase(user)
      data && await SaveUserCase(data.data)
      dispatch({
        type: ActionAuthType.SIGNUP,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionAuthType.ERROR_USER,
        payload: error as []
      })
    }
  }

  const signUpWithImage = async (user: User, file: Asset) => {
    try {
      dispatch({
        type: ActionAuthType.SENDREQUEST
      })
      const data = await RegisterAuthWithImage(user, file)
      data && await SaveUserCase(data.data)
      dispatch({
        type: ActionAuthType.SIGNUP,
        payload: data.data
      })
    } catch (error) {
      dispatch({
        type: ActionAuthType.ERROR_USER,
        payload: error as []
      })
    }
  }

  const setAddress = async (address: Address) => {
    if (!state.user)
      return
    dispatch({
      type: ActionAuthType.SET_ADDRESS,
      payload: address
    })

    await SaveUserCase(state.user)
  }
  return (
    <AuthContext.Provider value={{ state, currentUser, signIn, signOut, signUp, signUpWithImage, dispatch, setAddress }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
