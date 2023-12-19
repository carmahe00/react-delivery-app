import { createContext } from 'react';
import { Address } from '../../../domain/entity/address';
import Geolocation from 'react-native-geolocation-service';


export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: Geolocation.GeoPosition;
    isLoadingPlaces: boolean;
    places: Address[];
    currentPosition?:{
        refPoint: string,
        latitude: number,
        longitude: number
    },
    onRegionChangeComplete: (latitude: number, longitude: number) => Promise<string>
    create:(address: Address)=> Promise<void>
    getAddressByUser:()=> Promise<void>
}



export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps );