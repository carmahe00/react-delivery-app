import React from 'react'
import { View, Button, Image, Text, TouchableOpacity } from 'react-native';
import ProfileViewModel from './ViewModel';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import styles from './Style';
import { ScrollView } from 'react-native-gesture-handler';
import RoundedButton from '../../../components/RoundedButton';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';

type Props = NativeStackScreenProps<RootStackParamList>;

const ProfileInfoScreen = ({ navigation }: Props) => {
  const { signOut, user } = ProfileViewModel()
  const signAndReturn = () => {
    signOut()
    navigation.replace('HomeScreen')
  }
  const navigateProfileUpdate = () =>{
    navigation.navigate("ProfileUpdateScreen");
  }
  return (
    <View style={styles.container} >
      <Image style={styles.imageBackground} source={require('../../../../../assets/city.jpg')} />
      <TouchableOpacity onPress={signAndReturn} style={styles.logout} >
        <Image style={styles.imageLogout} source={require('../../../../../assets/logout.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace("RolesScreen")} style={styles.change} >
        <Image style={styles.imageLogout} source={require('../../../../../assets/change.png')} />
      </TouchableOpacity>
      <View
        style={styles.logoContainer} >
        {
          user?.image &&
          <Image
          source={{ uri: user?.image }}
          style={styles.logoImage}
        />
        }

      </View>
      <View style={
        styles.form
      }>
        <ScrollView>
          <View style={styles.formInfo} >
            <Image
              source={require('../../../../../assets/user.png')}
              style={styles.formImage}
            />
            <View style={styles.formContent} >
              <Text>{user?.name} {user?.lastName}</Text>
              <Text style={styles.formTextDescription} >User Name</Text>
            </View>
          </View>
          <View style={[styles.formInfo, { marginTop: 25 }]} >
            <Image
              source={require('../../../../../assets/email.png')}
              style={styles.formImage}
            />
            <View style={styles.formContent} >
              <Text>{user?.email}</Text>
              <Text style={styles.formTextDescription} >User Email</Text>
            </View>
          </View>
          <View style={[styles.formInfo, { marginTop: 25 }]} >
            <Image
              source={require('../../../../../assets/phone.png')}
              style={styles.formImage}
            />
            <View style={styles.formContent} >
              <Text>{user?.phone}</Text>
              <Text style={styles.formTextDescription} >Phone</Text>
            </View>
          </View>
        </ScrollView>
        <RoundedButton
          onPress={navigateProfileUpdate}
          text='Update Data'
        />
      </View>
    </View>
  )
}

export default ProfileInfoScreen