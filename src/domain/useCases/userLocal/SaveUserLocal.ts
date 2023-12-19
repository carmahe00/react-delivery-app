import { UserLcoalRepositoryImpl } from "../../../data/repositories/UserLocalRepositoryImpl";
import { User } from "../../entity/user";
const { save } = new UserLcoalRepositoryImpl()
export const SaveUserCase =async (user:User) => {
    return await save(user)
}