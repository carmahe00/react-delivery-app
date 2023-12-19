import React from 'react'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Style';
import ClientMapViewMoel from './ViewModel';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, Text, View } from 'react-native';
import RoundedButton from '../../../../components/RoundedButton';
import ClientAddressCustomMapStyles from './StyleMap';
interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressMapScreen'> { }
const ClientAddressMapScreen = ({ navigation }: Props) => {

  const { userLocation, mapRef, isLoading, onRegionChangeCompleteText,  form } = ClientMapViewMoel(navigation)
  return (
    <>
      {userLocation && !isLoading &&  <MapView
        ref={mapRef}
        style={styles.map}
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        customMapStyle={ClientAddressCustomMapStyles}
        onRegionChangeComplete={(region) => {
          onRegionChangeCompleteText(region.latitude, region.longitude)
        }}
      />}
      <Image
      style={styles.imageLocation}
        source={require("../../../../../../assets/location_home.png")}
      />
      <View style={styles.refPoint} >
        <Text style={styles.refPointText} >{form.refPoint}</Text>
      </View>
      <View style={styles.refPointPoint} >
        <RoundedButton
          text='SELECT POINT'
          onPress={() => {
            navigation.navigate({
              name: "ClientAddressCreateScreen",
              merge:true,
              params: {...form}
            })
            
          }}
        />
      </View>
    </>
  )
}
export default ClientAddressMapScreen