import { Asset } from "react-native-image-picker";
import { Product } from "../entity/product";
import { ResponseAPIDelivery } from "../../data/source/remote/models/ResponseApiDelivery";

export interface ProductRepository{
    create(product:Product, file:Asset[]):Promise<ResponseAPIDelivery>;
    getProductsByCategory(id:string): Promise<ResponseAPIDelivery>;
    remove(id:string): Promise<ResponseAPIDelivery>;

    update(product:Product):Promise<ResponseAPIDelivery>;
    updateWithImage(product:Product, file:Asset[]):Promise<ResponseAPIDelivery>;
}