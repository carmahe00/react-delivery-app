import React from 'react'
import { Category } from '../../domain/entity/category'
import { CategoryProvider } from '../context/category/CategoryProvider'
import { ProviderProps } from './MainStackNavigator'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoryCreateScreen from '../views/admin/category/create/CategoryCreate'
import CategoryUpdateScreen from '../views/admin/category/update/CategoryUpdate'
import AdminCategoryListScreen from '../views/admin/category/list/CategoryList'
import { Image, TouchableOpacity } from 'react-native'
import LoadingIndicator from '../components/LoadingIndicator'
import AdminProductNavigator from './AdminProductNavigator'
import { Product } from '../../domain/entity/product'

export type CategoryStackParamList = {
    CategoryCreateScreen: undefined,
    CategoryUpdateScreen: { category: Category },
    AdminCategoryListScreen: undefined,
    AdminProductNavigator: { category: Category, product?:Product }
}

export const CategoryState = ({ children }: ProviderProps) => {

    return (
        <CategoryProvider>
            {children}
        </CategoryProvider>
    )

}
const Stack = createNativeStackNavigator<CategoryStackParamList>();
const AdminCategoryNavigator = () => {
    return (
        <CategoryState>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} >
                <Stack.Screen name="AdminCategoryListScreen" component={AdminCategoryListScreen}
                    options={({ navigation }) => ({
                        title: 'Categories',
                        tabBarLabel: 'Categories',
                        headerShown: true,

                        headerRight: () => (<TouchableOpacity onPress={() => navigation.navigate("CategoryCreateScreen")}>
                            <Image source={require('../../../assets/add.png')} style={{ width: 35, height: 35 }} />
                        </TouchableOpacity>)
                    })}
                />
                <Stack.Screen name="CategoryCreateScreen" component={CategoryCreateScreen} options={{
                    headerShown: true,
                    title: "New Category",
                }}
                />
                <Stack.Screen name="CategoryUpdateScreen" component={CategoryUpdateScreen} options={{
                    headerShown: true,
                    title: "Edit Category"
                }}
                />

                <Stack.Screen name="AdminProductNavigator" component={AdminProductNavigator}/>
            </Stack.Navigator>
            <LoadingIndicator />
        </CategoryState>
    )
}

export default AdminCategoryNavigator