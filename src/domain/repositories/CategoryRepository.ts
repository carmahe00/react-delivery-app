import { Asset } from "react-native-image-picker";
import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";
import { Category } from "../entity/category";

export interface CategoryRepository {
    register(category:Category, file:Asset):Promise<ResponseAPIDelivery>
    update(category:Category):Promise<ResponseAPIDelivery>
    updateWithImage(category:Category, file:Asset):Promise<ResponseAPIDelivery>
    getAll():Promise<ResponseAPIDelivery>
    remove(id:string): Promise<ResponseAPIDelivery>
}