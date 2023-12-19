import React, { useContext } from 'react'
import { ProductContext } from '../../../../context/product/ProductProvider';
import { Category } from '../../../../../domain/entity/category';
import { useFocusEffect } from '@react-navigation/native';

const ClientProductListViewModel = (category: Category) => {
    const { getProductsByCategory, state } = useContext(ProductContext);
    useFocusEffect(React.useCallback(() => {
        if (category.id)
            getProductsByCategory(category.id)

    }, [category]))
    return {
        products: state?.products
    }
}

export default ClientProductListViewModel