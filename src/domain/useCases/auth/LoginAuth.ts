import { AuthRepositoryImpl } from "../../../data/repositories/AuthRepositoryImpl";

const { login } = new AuthRepositoryImpl()

export const LoginAuthUseCase =async (email:string, password:string) => {
    return await login(email, password);
}