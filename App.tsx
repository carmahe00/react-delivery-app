/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { ReactNode, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainStackNavigator from './src/presentation/navigator/MainStackNavigator';
import { PaperProvider } from 'react-native-paper';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';



function App(): JSX.Element {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    requestUserPermission()
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }, [])
  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <PaperProvider>
          <MainStackNavigator />
        </PaperProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}



export default App;
