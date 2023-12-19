import { useFocusEffect } from '@react-navigation/native'
import { CategoryContext } from '../../../../context/category/CategoryProvider';
import React, { useContext } from 'react';
const AdminCategoryListViewMoel = () => {
    const { getAllCategory, state, remove } = useContext(CategoryContext);
    useFocusEffect(React.useCallback(() => {
        getAllCategory()
    }, []))

    return {
        state,
        remove
    }
}

export default AdminCategoryListViewMoel