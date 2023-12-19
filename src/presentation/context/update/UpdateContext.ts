import { createContext } from "react"

import { UpdateState } from "./UpdateProvider"
import { Asset } from "react-native-image-picker"
import { User } from "../../../domain/entity/user"

export interface UpdateCOntext {
    state?: UpdateState
    update: (data: Partial<User>) => Promise<void>
    
    updateWithImage: (user: Partial<User>, file:Asset) => Promise<void>
}

export const UpdateContext = createContext<UpdateCOntext>({} as UpdateCOntext);