import { Asset } from "react-native-image-picker";
import { AuthRepositoryImpl } from "../../../data/repositories/AuthRepositoryImpl";
import { User } from "../../entity/user";
const { registerWithImage } = new AuthRepositoryImpl()
export const RegisterAuthWithImage = async (user:User, file:Asset) =>{
    return await registerWithImage(user, file);
}