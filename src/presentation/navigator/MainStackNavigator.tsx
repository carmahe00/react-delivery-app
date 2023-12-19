import React, { ReactNode } from 'react'
import { UpdateProvider } from '../context/update/UpdateProvider'
import { CategoryProvider } from '../context/category/CategoryProvider'
import { AuthProvider } from '../context/AuthProvider'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../views/home/Home'
import RegisterScreen from '../views/register/Register'
import RolScreen from '../views/roles/Rol'
import AdminTabsNavigator from './AdminTabsNavigator'
import ClientTabsNavigator from './ClientTabsNavigator'
import ProfileUpdateScreen from '../views/profile/update/ProfileUpdate'
import LoadingIndicator from '../components/LoadingIndicator'
import DeliveryTabsNavigator from './DeliveryTabsNavigator'
const AppState = ({ children }: ProviderProps) => {

    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )

}

export const AppUpdateState = ({ children }: ProviderProps) => {

    return (
        <UpdateProvider>
            {children}
        </UpdateProvider>
    )

}



export type RootStackParamList = {
    HomeScreen: undefined,
    RegisterScreen: undefined,
    RolesScreen: undefined,
    AdminTabsNavigator: undefined,
    ClientTabsNavigator: undefined,
    ProfileUpdateScreen: undefined,
    DeliveryTabsNavigator: undefined

}

const Stack = createNativeStackNavigator<RootStackParamList>();
export type ProviderProps = {
    children: ReactNode;
};
const MainStackNavigator = () => {
    
    return (
        <AppState>
            <AppUpdateState>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }} >
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                    />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                        headerShown: true,
                        title: 'New User'
                    }} />

                    <Stack.Screen name="RolesScreen" component={RolScreen} options={{
                        headerShown: true,
                        title: 'Select a role'
                    }} />

                    <Stack.Screen name="AdminTabsNavigator" component={AdminTabsNavigator} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="ClientTabsNavigator" component={ClientTabsNavigator} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} options={{
                        headerShown: true,
                        title: "Update Data"
                    }}
                    />

                    <Stack.Screen name="DeliveryTabsNavigator" component={DeliveryTabsNavigator} />

                </Stack.Navigator>
                <LoadingIndicator />
            </AppUpdateState>
        </AppState>
    )
}

export default MainStackNavigator