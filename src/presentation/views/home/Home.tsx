import React, { useEffect } from 'react'
import { StatusBar, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import RoundedButton from '../../components/RoundedButton';
import CustomtextInput from '../../components/CustomtextInput';
import styles from './Styles';
import HomeViewModel from './ViewModel';
import messaging from '@react-native-firebase/messaging';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
import { UpdateNotificationTokenUseCase } from '../../../domain/useCases/user/UpdateNotificationToken';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
const HomeScreen = ({ navigation }: Props) => {
    const { isDarkMode, backgroundStyle, onChange, navigationRegister, login, user } = HomeViewModel();

    useEffect(() => {
        (async () =>{
            if (user?.id !== null && user?.id !== undefined) {
                console.log(user)
                user.roles && user.roles.length > 1 ?
                    navigation.replace('RolesScreen') :
                    navigation.replace('DeliveryTabsNavigator')
    
                user.roles?.length === 0 && navigation.replace('ClientTabsNavigator')
                const token = await messaging().getToken()
                updateNotificationToken(user.id, token)
            }
        })()
    }, [user])

    
    

    const updateNotificationToken = async (id:string, token:string)=>{
        await UpdateNotificationTokenUseCase(id, token)
    }

    return (
        <SafeAreaView style={styles.conatiner}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />

            <Image style={styles.imageBackground} source={require('../../../../assets/chef.jpg')} />
            <View
                style={styles.logoContainer} >
                <Image
                    source={require('../../../../assets/logo.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.logoText}>FAST FOOD</Text>
            </View>
            <View style={
                styles.form
            }>
                <ScrollView>
                    <Text style={
                        styles.formText
                    }>Log In</Text>

                    <CustomtextInput
                        source={require('../../../../assets/email.png')}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChange={onChange}
                        myKey='email'
                    />

                    <CustomtextInput
                        source={require('../../../../assets/password.png')}
                        placeholder='Password'
                        secureTextEntry={true}
                        onChange={onChange}
                        myKey='password'
                    />
                    <View style={{
                        marginTop: 30
                    }}>
                        <RoundedButton text='Login' onPress={login} isLoading />
                    </View>
                    <View style={styles.formRegister} >
                        <Text>Don’t you have an account?</Text>
                        <TouchableOpacity onPress={navigationRegister} >

                            <Text style={styles.formTextRegister}  >Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}



export default HomeScreen