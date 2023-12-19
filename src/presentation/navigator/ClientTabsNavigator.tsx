import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileInfoScreen from '../views/profile/info/ProfileInfo';
import { Image } from 'react-native';
import ClientStackNavigator from './ClientStackNavigator';
import ClientOrderStackNavigator from './ClientOrderStackNavigator';
import { OrderProvider } from '../context/order/OrderProvider';
export type RootClientButtomStackParamList = {
  ClientStackNavigator: undefined,
  ClientOrderStackNavigator: undefined,
  ProfileInfoScreen: undefined,
}
const Tab = createBottomTabNavigator<RootClientButtomStackParamList>();
const ClientTabsNavigator = () => {
  return (

    <Tab.Navigator>
      <Tab.Screen
        name="ClientStackNavigator"
        component={ClientStackNavigator}
        options={{
          title: 'Categories',
          tabBarLabel: 'Categories',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../../assets/list.png')} style={{ height: 25, width: 25 }} />
          ),
        }}
      />
      <Tab.Screen
        name="ClientOrderStackNavigator"
        component={ClientOrderStackNavigator}
        options={{
          headerShown: false,
          title: 'Orders Here',
          tabBarLabel: 'Orders Here',
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../../assets/orders.png')} style={{ height: 25, width: 25 }} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileInfoScreen"
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
  )
}

export default ClientTabsNavigator