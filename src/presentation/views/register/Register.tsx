import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import RoundedButton from '../../components/RoundedButton';

import CustomtextInput from '../../components/CustomtextInput';
import styles from './Styles';
import RegisterViewModel from './ViewModel';
import ModalPickerImage from '../../components/ModalPickerImage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/MainStackNavigator';


type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;
const RegisterScreen = ({ navigation }:Props) => {
  const { register, onChange, pickImage, form, takePhoto, user } = RegisterViewModel()
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined)
        navigation.replace('ClientTabsNavigator')
    
}, [user])
  return (
    <SafeAreaView style={styles.conatiner}>
      <Image style={styles.imageBackground} source={require('../../../../assets/chef.jpg')} />
      <View
        style={styles.logoContainer} >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          {
            form.image === '' ?
              <Image
                source={require('../../../../assets/user_image.png')}
                style={styles.logoImage}
              /> :
              <Image
                source={{
                  uri: form.image
                }}
                style={[styles.logoImage, styles.roundedImage]}
              />
          }
        </TouchableOpacity>
        <Text style={styles.logoText}>CHOOSE IMAGE</Text>
      </View>
      <View style={
        styles.form
      }>
        <ScrollView>
          <Text style={
            styles.formText
          }>REGISTER</Text>

          <CustomtextInput
            source={require('../../../../assets/user.png')}
            placeholder='name'
            keyboardType='default'
            onChange={onChange}
            myKey='name'
          />

          <CustomtextInput
            source={require('../../../../assets/my_user.png')}
            placeholder='lastName'
            keyboardType='default'
            onChange={onChange}
            myKey='lastName'
          />
          <CustomtextInput
            source={require('../../../../assets/phone.png')}
            placeholder='phone'
            keyboardType='numeric'
            onChange={onChange}
            myKey='phone'
          />
          <CustomtextInput
            source={require('../../../../assets/email.png')}
            placeholder='email'
            keyboardType='email-address'
            onChange={onChange}
            myKey='email'
          />
          <CustomtextInput
            source={require('../../../../assets/password.png')}
            placeholder='password'
            keyboardType='default'
            onChange={onChange}
            secureTextEntry={true}
            myKey='password'
          />
          <CustomtextInput
            source={require('../../../../assets/confirm_password.png')}
            placeholder='confirmPassword'
            keyboardType='default'
            onChange={onChange}
            secureTextEntry={true}
            myKey='confirmPassword'
          />
          <View style={{
            marginTop: 30
          }}>
            <RoundedButton text='Register' onPress={register} />
          </View>
        </ScrollView>
      </View>
      <ModalPickerImage openGallery={pickImage} openCamera={takePhoto} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  )
}

export default RegisterScreen