import { StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Category } from '../../domain/entity/category'
import AdminProductListScreen from '../views/admin/products/list/ProductList'
import { CategoryStackParamList } from './AdminCategoryNavigator'
import AdminProductCreateScreen from '../views/admin/products/create/ProductCreate'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native'
import { ProviderProps } from './MainStackNavigator'
import { ProductProvider } from '../context/product/ProductProvider'
import LoadingIndicator from '../components/LoadingIndicator'
import AdminProductUpdateScreen from '../views/admin/products/update/ProductUpdate'
import { Product } from '../../domain/entity/product'
export type ProductStackParamList = {
    AdminProductListScreen: { category: Category }
    AdminProductCreateScreen: { category: Category }
    AdminProductUpdateScreen: { category: Category, product: Product }
}

export const ProductState = ({ children }: ProviderProps) => {

    return (
        <ProductProvider>
            {children}
        </ProductProvider>
    )

}
const Stack = createStackNavigator<ProductStackParamList>()
interface Props extends StackScreenProps<CategoryStackParamList, 'AdminProductNavigator'> { }
const AdminProductNavigator = ({ navigation, route }: Props) => {
    return (
        <ProductState>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen
                    name='AdminProductListScreen'
                    component={AdminProductListScreen}
                    initialParams={{
                        category: route.params.category
                    }}
                    options={({ navigation }) => ({
                        title: 'Products',
                        tabBarLabel: 'Products',
                        headerShown: true,

                        headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate("AdminProductCreateScreen")}>
                            <Image source={require('../../../assets/add.png')} style={{ width: 35, height: 35 }} />
                        </TouchableOpacity>)
                    })}
                />
                <Stack.Screen
                    name='AdminProductCreateScreen'
                    component={AdminProductCreateScreen}
                    initialParams={{
                        category: route.params.category,
                    }}
                    options={{
                        headerShown: true,
                        title: 'New Product'
                    }}

                />

                <Stack.Screen
                    name='AdminProductUpdateScreen'
                    component={AdminProductUpdateScreen}
                    options={{
                        headerShown: true,
                        title: 'Update Product'
                    }}

                />
            </Stack.Navigator>
            <LoadingIndicator />
        </ProductState>
    )
}

export default AdminProductNavigator