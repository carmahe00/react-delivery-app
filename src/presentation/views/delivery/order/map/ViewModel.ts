import React, { useContext, useEffect, useRef, useState } from "react";
import { PlacesContext } from "../../../../context/place/PlaceContext";
import { StackNavigationProp } from "@react-navigation/stack";
import MapView, { Camera } from "react-native-maps";
import { DeliveryOrderStackParamList } from "../../../../navigator/DeliveryOrderStackNavigator";
import Geolocation from 'react-native-geolocation-service';
import { OrderContext } from "../../../../context/order/OrderContext";
import { SocketContext } from "../../../../context/socket/SocketProvide";
import { useFocusEffect } from "@react-navigation/native";
import { Order } from "../../../../../domain/entity/order";


const DeliveryOrderMapViewMoel = (navigation: StackNavigationProp<DeliveryOrderStackParamList, "DeliveryOrderMapScreen">, order: Order) => {

    const { userLocation, isLoading } = useContext(PlacesContext);
    const { updateToDelivered } = useContext(OrderContext);
    const { socket } = useContext(SocketContext);
    const [currentPosition, setCurrentPosition] = useState<Geolocation.GeoPosition>()
    const mapRef = useRef<MapView | null>(null)
    useFocusEffect(React.useCallback(() => {
        

        if (!userLocation)
            return console.log("ERROR")
        const newCamera: Camera = {
            center: { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 0
        }
        mapRef.current?.animateCamera(newCamera, { duration: 3000 })
        Geolocation.watchPosition((position) => {
            socket.emit("position", {
                id_order: order.id,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
            const newCamera: Camera = {
                center: { latitude: position.coords.latitude, longitude: position.coords.longitude },
                zoom: 15,
                heading: 0,
                pitch: 0,
                altitude: 0
            }
            mapRef.current?.animateCamera(newCamera, { duration: 3000 })
            setCurrentPosition(position)
        }, console.log, {
            enableHighAccuracy: true,
            interval: 10,
            accuracy: {
                android: "high",
                ios: "best"
            }
            
        })
        return () => {
            mapRef.current = null
        }
    }, []))

    return {
        userLocation,
        mapRef,
        isLoading,
        updateToDelivered,
        currentPosition
    }
}

export default DeliveryOrderMapViewMoel