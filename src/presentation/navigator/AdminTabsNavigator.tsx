import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileInfoScreen from '../views/profile/info/ProfileInfo';
import { Image } from 'react-native';
import AdminCategoryNavigator from './AdminCategoryNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { OrderProvider } from '../context/order/OrderProvider';
import AdminOrderStackNavigator from './AdminOrderStackNavigator';
const Tab = createBottomTabNavigator();


const AdminTabsNavigator = () => {
    return (
        <OrderProvider>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Tab.Screen
                    name="AdminCategoryScreen"
                    component={AdminCategoryNavigator}
                    options={({ route }) => ({
                        tabBarLabel: 'Categories',
                        headerShown: false,
                        tabBarIcon: () => (
                            <Image source={require('../../../assets/list.png')} style={{ height: 25, width: 25 }} />
                        ),
                        tabBarStyle: ((route) => {
                            //Hide certeain route
                            const routeName = getFocusedRouteNameFromRoute(route) ?? ""
                            if (routeName === 'CategoryUpdateScreen' || routeName === 'CategoryCreateScreen') {
                                return { display: "none" }
                            }
                            return
                        })(route),
                    })}
                />
                <Tab.Screen
                    name="AdminOrderStackNavigator"
                    component={AdminOrderStackNavigator}
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

export default AdminTabsNavigator