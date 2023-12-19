import { useContext, useEffect, useRef, useState } from "react";
import { PlacesContext } from "../../../../context/place/PlaceContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { ClientStackParamList } from "../../../../navigator/ClientStackNavigator";
import MapView, { Camera } from "react-native-maps";
import { useForm } from "../../../../hooks/useForm";



const ClientMapViewMoel = (navigation: StackNavigationProp<ClientStackParamList, "ClientAddressMapScreen">) => {
    
    const { form, onChange } = useForm({
        refPoint: '',
        latitude: 0.0,
        longitude: 0.0,
    })
    const { userLocation, isLoading, onRegionChangeComplete } = useContext(PlacesContext);
    const mapRef = useRef<MapView | null>(null)
    useEffect(() => {
        if (!userLocation)
            return navigation.pop()
        const newCamera: Camera = {
            center: { latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude },
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 0
        }
        mapRef.current?.animateCamera(newCamera, { duration: 3000 })
        return () =>{
            mapRef.current = null
        }
    }, [userLocation])

    const onRegionChangeCompleteText = async (latitude: number, longitude: number) => {
        onChange(latitude, "latitude")
        onChange(longitude, "longitude")
        const address = await onRegionChangeComplete(latitude, longitude)
        if (address) 
            onChange(address, "refPoint")
        
    }

    return {
        userLocation,
        mapRef,
        isLoading,
        onRegionChangeCompleteText,
        form
    }
}

export default ClientMapViewMoel