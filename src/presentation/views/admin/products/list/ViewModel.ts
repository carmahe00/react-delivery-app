import { useFocusEffect } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ProductContext } from '../../../../context/product/ProductProvider';
import { Category } from '../../../../../domain/entity/category';
const AdminProductListViewMoel = (category:Category) => {
    const { getProductsByCategory, state, remove } = useContext(ProductContext);
    useFocusEffect(React.useCallback(() => {
        if(category.id)
        getProductsByCategory(category.id)

    }, [category]))

    return {
        state,
        remove
    }
}

export default AdminProductListViewMoel