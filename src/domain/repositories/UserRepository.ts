import { Asset } from "react-native-image-picker";
import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";
import { User } from "../entity/user";

export interface UserRepository {
    getDelivery():Promise<User[]>
    update(user:User): Promise<ResponseAPIDelivery>
    updateWithImage(user:User, file:Asset): Promise<ResponseAPIDelivery>
    updateNotificationToken(id:string, token:string): Promise<ResponseAPIDelivery>
}