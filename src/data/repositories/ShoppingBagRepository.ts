import { Product } from "../../domain/entity/product";
import { ShoppingBagLocalRespository } from "../../domain/repositories/ShoppingBagLocalRespository";
import { localStotage } from "../source/local/LocalStorage";

export class ShoppingBagRepositoryImpl implements ShoppingBagLocalRespository{
    async save(products: Product[]): Promise<void> {
        const { save } = localStotage()
        await save("shopping_bag", JSON.stringify(products))
    }
    async getShoppingBag(): Promise<Product[]> {
        const { getItem } = localStotage();
        const storedValue = await getItem('shopping_bag');
        return storedValue ? JSON.parse(storedValue) as Product[] : [];
    }

}