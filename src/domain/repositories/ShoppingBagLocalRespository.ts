import { Product } from "../entity/product";

export interface ShoppingBagLocalRespository{
    save(products:Product[]):Promise<void>
    getShoppingBag():Promise<Product[]>
}