import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AdminOrderListScreen from '../views/admin/order/list/OrderList'
import AdminOrderDetailScreen from '../views/admin/order/detail/OrderDetail'
import { Order } from '../../domain/entity/order'

export type AdminOrderStackParamList = {
    AdminOrderListScreen: undefined,
    AdminOrderDetailScreen: { order: Order },
}


const Stack = createNativeStackNavigator<AdminOrderStackParamList>();
const AdminOrderStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} >
            <Stack.Screen name="AdminOrderListScreen" component={AdminOrderListScreen}
            />
            <Stack.Screen name="AdminOrderDetailScreen" component={AdminOrderDetailScreen} options={{
                headerShown: true,
                title: "Order detail",
            }}
            />
            
        </Stack.Navigator>
    )
}

export default AdminOrderStackNavigator