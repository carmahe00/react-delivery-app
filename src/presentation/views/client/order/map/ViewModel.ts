import { useContext, useEffect, useRef, useState } from "react";
import { PlacesContext } from "../../../../context/place/PlaceContext";
import { StackNavigationProp } from "@react-navigation/stack";
import MapView, { Camera } from "react-native-maps";
import { ClientOrderStackParamList } from "../../../../navigator/ClientOrderStackNavigator";
import { Order } from "../../../../../domain/entity/order";
import { SocketContext } from "../../../../context/socket/SocketProvide";


const ClientOrderMapViewMoel = (navigation: StackNavigationProp<ClientOrderStackParamList, "ClientOrderMapScreen">, order: Order) => {

    const { userLocation, isLoading } = useContext(PlacesContext);
    const { socket } = useContext(SocketContext);
    const [currentPosition, setCurrentPosition] = useState<{
        latitude: number,
        longitude: number,
    }>({
        latitude:0.0,
        longitude: 0.0
    })
    const mapRef = useRef<MapView | null>(null)
    useEffect(() => {
        console.log(`position/${order.id}`)
        socket.on(`position/${order.id}`, (data:any) => {
            setCurrentPosition({
                latitude: data.lat,
                longitude: data.lng,
            })
        })

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
        return () => {
            mapRef.current = null
        }
    }, [])

    return {
        userLocation,
        mapRef,
        isLoading,
        currentPosition,
        socket
    }
}

export default ClientOrderMapViewMoel