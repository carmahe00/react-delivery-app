import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Order } from '../../domain/entity/order'
import DeliveryOrderDetailScreen from '../views/delivery/order/detail/OrderDetail'
import DeliveryOrderMapScreen from '../views/delivery/order/map/AddressMap'
import { PlacesProvider } from '../context/place/PlaceProvider'
import ClientOrderListScreen from '../views/client/order/list/OrderList'
import ClientOrderDetailScreen from '../views/client/order/detail/OrderDetail'
import ClientOrderMapScreen from '../views/client/order/map/OrderMap'
import { OrderProvider } from '../context/order/OrderProvider'
import SocketProvide from '../context/socket/SocketProvide'

export type ClientOrderStackParamList = {
    ClientOrderListScreen: undefined,
    ClientOrderDetailScreen: { order: Order },
    ClientOrderMapScreen: { order: Order }
}


const Stack = createNativeStackNavigator<ClientOrderStackParamList>();
const ClientOrderStackNavigator = () => {
    return (
        <PlacesProvider>
            <OrderProvider>
                <SocketProvide>
                    <Stack.Navigator screenOptions={{
                        headerShown: false
                    }} >
                        <Stack.Screen name="ClientOrderListScreen" component={ClientOrderListScreen}
                        />
                        <Stack.Screen name="ClientOrderDetailScreen" component={ClientOrderDetailScreen} options={{
                            headerShown: true,
                            title: "Order detail",
                        }}
                        />

                        <Stack.Screen name="ClientOrderMapScreen" component={ClientOrderMapScreen}
                        />

                    </Stack.Navigator>
                </SocketProvide>
            </OrderProvider>
        </PlacesProvider>
    )
}

export default ClientOrderStackNavigator