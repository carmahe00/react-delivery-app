import { ActionAuthType, AuthState, initialState } from "./AuthProvider"
import { User } from '../../domain/entity/user'
import { Address } from "../../domain/entity/address";

export type AuthAction =
    { type: ActionAuthType.SIGNUP, payload: User } |
    { type: ActionAuthType.CURRENT_USER, payload: User } |
    { type: ActionAuthType.SET_ADDRESS, payload: Address } |
    { type: ActionAuthType.SENDREQUEST } |
    { type: ActionAuthType.SIGNIN, payload: User } |
    { type: ActionAuthType.ERROR_USER, payload: [] } |
    { type: ActionAuthType.SIGNOUT }
export const authReducer = (state: AuthState, action: AuthAction): typeof initialState => {
    switch (action.type) {
        case ActionAuthType.SIGNUP:

            return {
                ...state,
                user: action.payload,
                errors: undefined,
                isLoading: false
            };
        case ActionAuthType.SIGNIN:
            return {
                ...state,
                user: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionAuthType.CURRENT_USER:
            return {
                ...state,
                user: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionAuthType.SET_ADDRESS:
            const user = state.user
            return {
                ...state,
                errors: undefined,
                isLoading: false,
                user: {...user!, address: action.payload}
            }
        case ActionAuthType.SENDREQUEST:
            return {
                isLoading: true
            }
        case ActionAuthType.SIGNOUT:
            return initialState
        case ActionAuthType.ERROR_USER:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return initialState;
    }
}
