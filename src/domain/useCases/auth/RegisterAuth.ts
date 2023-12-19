import { AuthRepositoryImpl } from "../../../data/repositories/AuthRepositoryImpl";
import { User } from "../../entity/user";
const { register } = new AuthRepositoryImpl()
export const RegisterAuthUseCase = async (user:User) =>{
    return await register(user);
}