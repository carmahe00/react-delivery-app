import { PlacesState } from './PlaceProvider';
import { Address } from '../../../domain/entity/address';
import Geolocation from 'react-native-geolocation-service';



type PlacesAction =
    | { type: 'setUserLocation', payload: Geolocation.GeoPosition }
    | {
        type: 'setCurrentPosition', payload: {
            refPoint: string,
            latitude: number,
            longitude: number
        }
    }
    | { type: 'setLoadingPlaces' }
    | { type: 'setPlaces', payload: Address[] }

export const placesReducer = (state: PlacesState, action: PlacesAction): PlacesState => {

    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }

        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: true,
                places: [],
            }
        case 'setCurrentPosition':
            return {
                ...state,
                currentPosition: action.payload,
                isLoadingPlaces: true,
            }

        case 'setPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            }

        default:
            return state;
    }

}