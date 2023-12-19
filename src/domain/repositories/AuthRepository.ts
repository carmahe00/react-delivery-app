import { Asset } from "react-native-image-picker";
import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";
import { User } from "../entity/user";

export interface AuthRepository {
    register(user:User): Promise<ResponseAPIDelivery>
    registerWithImage(user:User, file:Asset): Promise<ResponseAPIDelivery>
    login(email:string, password:string): Promise<ResponseAPIDelivery>
}