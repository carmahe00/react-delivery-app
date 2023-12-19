import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { CategoryContext } from '../../../../context/category/CategoryContext';
import { useFocusEffect } from '@react-navigation/native';
const CategoryViewModel = () => {
    const { state, getAllCategory } = useContext(CategoryContext);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    useFocusEffect(React.useCallback(() => {
        getAllCategory()
    }, []))
    return {
        categories: state?.categories,
        loading: state?.isLoading,
        width,
        height
    }
}

export default CategoryViewModel