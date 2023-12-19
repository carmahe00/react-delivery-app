import { User } from "../../../domain/entity/user"
import { ActionUpdateType, UpdateState, initialState } from "./UpdateProvider"

type UpdateAction =

    { type: ActionUpdateType.UPDATEUSER, payload: Partial<User> } |
    { type: ActionUpdateType.SENDREQUEST } |
    { type: ActionUpdateType.ERROR_USER_UPDATE, payload: [] }
export const authReducer = (state: UpdateState, action: UpdateAction): typeof initialState => {
    switch (action.type) {

        case ActionUpdateType.UPDATEUSER:
            return {
                ...state,
                user: action.payload,
                errors: undefined,
                isLoading: false
            }
        case ActionUpdateType.SENDREQUEST:
            return {
                isLoading: true
            }
        case ActionUpdateType.ERROR_USER_UPDATE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
        default:
            return initialState;
    }
}
