import React from 'react'

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Style';
import ClientMapViewMoel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { Image, ScrollView, Text, View } from 'react-native';
import RoundedButton from '../../../../components/RoundedButton';
import ClientAddressCustomMapStyles from './StyleMap';
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from '@env'

interface Props extends StackScreenProps<DeliveryOrderStackParamList, 'DeliveryOrderMapScreen'> { }
const DeliveryOrderMapScreen = ({ navigation, route }: Props) => {
  const { order } = route.params
  const { userLocation, mapRef, isLoading, currentPosition, updateToDelivered } = ClientMapViewMoel(navigation, order)

  return (
    <>
      {userLocation && !isLoading && order.address && <MapView
        ref={mapRef}
        style={styles.map}
        zoomEnabled
        provider={PROVIDER_GOOGLE}
        customMapStyle={ClientAddressCustomMapStyles}
        zoomControlEnabled

      >
        {currentPosition && <Marker
          coordinate={currentPosition.coords}
        >
          <Image
            source={require("../../../../../../assets/delivery.png")}
            style={styles.markerImage}

          />
        </Marker>}
        <MapViewDirections
          origin={userLocation.coords}
          destination={{
            latitude: order.address?.lat,
            longitude: order.address?.lng,
          }}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={3}
          strokeColor="orange"
        />
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
            {order.client?.image && <Image
              style={styles.imageClient}
              source={{ uri: order.client?.image }}
            />}
            <Text style={styles.nameClient} >{order.client?.name} {order.client?.lastName}</Text>
            <Image
              style={styles.imagePhone}
              source={require("../../../../../../assets/phone.png")}
            />
          </View>
        </ScrollView>
        <RoundedButton
          text='Deliver Order'
          isLoading
          onPress={async () => {
            await updateToDelivered(order)
          }}
        />
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
export default DeliveryOrderMapScreen