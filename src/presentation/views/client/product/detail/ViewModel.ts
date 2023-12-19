
import { Dimensions } from 'react-native';
import { Product } from '../../../../../domain/entity/product';
import { useContext, useEffect, useState } from 'react';
import { ShoppingBagContext } from '../../../../context/shopping/ShoppingContext';

const ClienteProductDetailViewModel = (product: Product) => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const { state, saveItem } = useContext(ShoppingBagContext)
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0.0);
    const productImages: string[] = [
        product.image1,
        product.image2,
        product.image3,
    ].filter((image): image is string => !!image); // to tell TypeScript that the filtered array only contains string values.
    const addItem = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity + 1;
            calculatePrice(newQuantity);
            return newQuantity;
        });
    }

    const addToBag = () => {
        if (quantity > 0) {
            product.quantity = quantity
            saveItem(product)
        }
    }

    const removeItem = () => {
        setQuantity((prevQuantity) => {
            const newQuantity = prevQuantity - 1;
            calculatePrice(newQuantity);
            return newQuantity >= 0 ? newQuantity : 0;
        });
    }

    const calculatePrice = (newQuantity: number) => {
        setPrice(newQuantity * product.price);
    }

    useEffect(() => {
        const index = state.products.findIndex((p) => p.id == product.id)
        if (index !== -1)
            setQuantity(state.products[index].quantity!)

    }, [state])


    return {
        width,
        height,
        productImages,
        addItem,
        state,
        removeItem,
        price,
        quantity,
        addToBag

    }
}

export default ClienteProductDetailViewModel