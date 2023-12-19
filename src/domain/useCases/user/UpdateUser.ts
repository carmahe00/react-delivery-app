import { UserRepositoryImpl } from "../../../data/repositories/UserRepositoryImp";
import { User } from "../../entity/user";

const { update } = new UserRepositoryImpl();

export const UpdateUser = async(user:Partial<User>) => {
    return await update(user);
}