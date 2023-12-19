import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Order } from '../../domain/entity/order'
import DeliveryOrderListScreen from '../views/delivery/order/list/OrderList'
import DeliveryOrderDetailScreen from '../views/delivery/order/detail/OrderDetail'
import DeliveryOrderMapScreen from '../views/delivery/order/map/AddressMap'
import { PlacesProvider } from '../context/place/PlaceProvider'
import SocketProvide from '../context/socket/SocketProvide'

export type DeliveryOrderStackParamList = {
    DeliveryOrderListScreen: undefined,
    DeliveryOrderDetailScreen: { order: Order },
    DeliveryOrderMapScreen: { order: Order }
}


const Stack = createNativeStackNavigator<DeliveryOrderStackParamList>();
const DeliveryOrderStackNavigator = () => {
    return (
        <PlacesProvider>
            <SocketProvide>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} >
                    <Stack.Screen name="DeliveryOrderListScreen" component={DeliveryOrderListScreen}
                    />
                    <Stack.Screen name="DeliveryOrderDetailScreen" component={DeliveryOrderDetailScreen} options={{
                        headerShown: true,
                        title: "Order detail",
                    }}
                    />

                    <Stack.Screen name="DeliveryOrderMapScreen" component={DeliveryOrderMapScreen}
                    />

                </Stack.Navigator>
            </SocketProvide>
        </PlacesProvider>
    )
}

export default DeliveryOrderStackNavigator