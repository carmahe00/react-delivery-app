import { createContext } from "react"
import { User } from "../../domain/entity/user"
import { AuthState } from "./AuthProvider"
import { Asset } from "react-native-image-picker"
import { AuthAction } from "./AuthReducer"
import { Address } from "../../domain/entity/address"

export interface AuthCOntext {
    state?: AuthState
    dispatch: React.Dispatch<AuthAction>
    signUp: (data: User) => Promise<void>
    signIn: (email:string, password:string) => Promise<void>
    currentUser: () => Promise<void>
    signOut: () => Promise<void>
    signUpWithImage: (user: User, file:Asset) => Promise<void>
    setAddress: (address: Address) => void
}

export const AuthContext = createContext<AuthCOntext>({} as AuthCOntext);