import React, { useContext } from 'react'
import { MyColors } from '../themes/AppTheme'
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { UpdateContext } from '../context/update/UpdateContext';
import { CategoryContext } from '../context/category/CategoryContext';
import { ProductContext } from '../context/product/ProductContext';

const LoadingIndicator = () => {
    const { state } = useContext(AuthContext);
    const { state:stateUpdate } = useContext(UpdateContext);
    const { state:stateCategory } = useContext(CategoryContext);
    const { state:stateProduct } = useContext(ProductContext);

    return state?.isLoading || stateUpdate?.isLoading || stateCategory?.isLoading || stateProduct?.isLoading ? (
        // Add styles for your overlay here
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={MyColors.primary} />
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default LoadingIndicator
