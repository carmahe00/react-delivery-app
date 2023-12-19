import React, { useContext } from 'react'
import { ShoppingBagContext } from '../../../context/shopping/ShoppingProvider';
import { Product } from '../../../../domain/entity/product';

const ShoppingModelListViewModel = () => {
    const { saveItem, state, deleteItem } = useContext(ShoppingBagContext);
    const addItem = async (product:Product) => {
        product.quantity = product.quantity! +1;
        await saveItem(product);
    }

    const subtractItem = async (product:Product) =>{
        if(product.quantity! > 1){
            product.quantity = product.quantity! -1;
            await saveItem(product)
        }
    }

    return {
        products: state?.products,
        total: state.total,
        addItem,
        subtractItem,
        deleteItem
    }
}

export default ShoppingModelListViewModel