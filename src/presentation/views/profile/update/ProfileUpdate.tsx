import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';



import styles from './Styles';
import ProfileUpdateViewModel from './ViewModel';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomtextInput from '../../../components/CustomtextInput';
import ModalPickerImage from '../../../components/ModalPickerImage';
import RoundedButton from '../../../components/RoundedButton';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileUpdateScreen'>;
const ProfileUpdateScreen = ({ navigation }:Props) => {
  const { updateUser, onChange, pickImage, form, takePhoto } = ProfileUpdateViewModel()
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <SafeAreaView style={styles.conatiner}>
      <Image style={styles.imageBackground} source={require('../../../../../assets/city.jpg')} />
      <View
        style={styles.logoContainer} >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
        >
          {
            form.image === '' ?
              <Image
                source={require('../../../../../assets/user_image.png')}
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
          }>Update</Text>

          <CustomtextInput
            source={require('../../../../../assets/user.png')}
            placeholder='name'
            value={form.name}
            keyboardType='default'
            onChange={onChange}
            myKey='name'
          />

          <CustomtextInput
            source={require('../../../../../assets/my_user.png')}
            placeholder='lastName'
            value={form.lastName}
            keyboardType='default'
            onChange={onChange}
            myKey='lastName'
          />
          <CustomtextInput
            source={require('../../../../../assets/phone.png')}
            placeholder='phone'
            value={form.phone}
            keyboardType='numeric'
            onChange={onChange}
            myKey='phone'
          />
          
          <View style={{
            marginTop: 30
          }}>
            <RoundedButton text='Update' onPress={updateUser} />
          </View>
        </ScrollView>
      </View>
      <ModalPickerImage openGallery={pickImage} openCamera={takePhoto} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  )
}

export default ProfileUpdateScreen