import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileInfoScreen from '../views/profile/info/ProfileInfo';
import { Image } from 'react-native';
import AdminCategoryNavigator from './AdminCategoryNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { OrderProvider } from '../context/order/OrderProvider';
import DeliveryOrderStackNavigator from './DeliveryOrderStackNavigator';
const Tab = createBottomTabNavigator();


const DeliveryTabsNavigator = () => {
    return (
        <OrderProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                
                <Tab.Screen
                    name="DeliveryOrderStackNavigator"
                    component={DeliveryOrderStackNavigator}
                    options={{
                        title: 'Orders',
                        tabBarLabel: 'Orders',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../../assets/orders.png')} style={{ height: 25, width: 25 }} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="ProfileInforScreen"
                    component={ProfileInfoScreen}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <Image source={require('../../../assets/user_menu.png')} style={{ height: 25, width: 25 }} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </OrderProvider>
    )
}

export default DeliveryTabsNavigator