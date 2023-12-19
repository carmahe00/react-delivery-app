import React, { useEffect } from 'react'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Style';
import ClientMapViewMoel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, ScrollView, Text, View } from 'react-native';
import ClientAddressCustomMapStyles from './StyleMap';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ClientOrderStackParamList } from '../../../../navigator/ClientOrderStackNavigator';

interface Props extends StackScreenProps<ClientOrderStackParamList, 'ClientOrderMapScreen'> { }
const ClientOrderMapScreen = ({ navigation, route }: Props) => {
  const { order } = route.params
  const { userLocation, mapRef, isLoading, currentPosition, socket } = ClientMapViewMoel(navigation, order)
  // useEffect(() => {
  //   const unsubscriber = navigation.addListener("beforeRemove", () => {
  //     socket.disconnect()
  //   })

  //   return unsubscriber
  // }, [])

  return (
    <>
      {userLocation  && <MapView
        ref={mapRef}
        style={styles.map}
        zoomEnabled
        provider={PROVIDER_GOOGLE}
        customMapStyle={ClientAddressCustomMapStyles}
        zoomControlEnabled

      >
        {currentPosition.latitude !== 0.0 && <Marker
          coordinate={currentPosition}
        >
          <Image
            source={require("../../../../../../assets/delivery.png")}
            style={styles.markerImage}

          />
        </Marker>}
      </MapView>}

      <View style={styles.info} >
        <ScrollView style={{ flex: 1 }} >
          <View style={styles.infoRow} >
            <View style={styles.infoText} >
              <Text style={styles.infoTitle} >neighborhood</Text>
              <Text style={styles.infoDescription} >{order.address?.neighborhood}</Text>
            </View>

          </View>
          <View style={styles.infoRow} >
            <View style={styles.infoText} >
              <Text style={styles.infoTitle} >address</Text>
              <Text style={styles.infoDescription} >{order.address?.address}</Text>
            </View>
            <Image
              source={require("../../../../../../assets/location_home.png")}
              style={styles.watchImage}
            />
          </View>

          <View style={styles.divider} ></View>
          <View style={styles.infoClient} >
            {order.delivery?.image && <Image
              style={styles.imageClient}
              source={{ uri: order.delivery?.image }}
            />}
            <Text style={styles.nameClient} >{order.delivery?.name} {order.delivery?.lastName}</Text>
            <Image
              style={styles.imagePhone}
              source={require("../../../../../../assets/phone.png")}
            />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()} >
          <Image
            style={styles.back}
            source={require("../../../../../../assets/back.png")}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}
export default ClientOrderMapScreen