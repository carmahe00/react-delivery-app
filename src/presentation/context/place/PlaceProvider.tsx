import { useContext, useEffect, useReducer } from 'react';
import { PlacesContext } from './PlaceContext';
import { placesReducer } from './placeReducer';
import { Platform, ToastAndroid } from 'react-native';
import { ApiGecoding } from '../../../data/source/remote/api/ApiGecoding';
import { CreteAddressUseCase } from '../../../domain/useCases/address/CreateAddress';
import { Address } from '../../../domain/entity/address';
import { GetAddressByUserUseCase } from '../../../domain/useCases/address/GetAddressByUser';
import { AuthContext } from '../AuthContext';
import Geolocation from 'react-native-geolocation-service';


export interface PlacesState {
    isLoading: boolean;
    userLocation?: Geolocation.GeoPosition;
    realTimePosition?: Geolocation.GeoPosition;
    isLoadingPlaces: boolean;
    places: Address[];
    currentPosition?: {
        refPoint: string,
        latitude: number,
        longitude: number
    }
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    isLoadingPlaces: false,
    places: [],
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
    const { setAddress } = useContext(AuthContext)

    useEffect(() => {
        (async () => {
            dispatch({ type: 'setLoadingPlaces' })
            if(Platform.OS === "ios"){

                const response = await Geolocation.requestAuthorization('always')
                switch (response) {
                    case "denied":
                        ToastAndroid.show('PERMISSION_DENIED', ToastAndroid.BOTTOM)
                        break;
                    case "disabled":
                        ToastAndroid.show('POSITION_UNAVAILABLE', ToastAndroid.BOTTOM)
                        break;
                    case 'granted':
                        ToastAndroid.show('granted', ToastAndroid.BOTTOM)
                        break;
                    case 'restricted':
                        ToastAndroid.show('restricted', ToastAndroid.BOTTOM)
                        break;
                    default:
                        ToastAndroid.show('GRANTED PERMISSION TO APP...', ToastAndroid.BOTTOM)
                        break;
                }
            }
            Geolocation.getCurrentPosition((response) => {
                dispatch({ type: 'setUserLocation', payload: response })
            })
        })()
    }, []);



    // Function to geocode coordinates
    const onRegionChangeComplete = async (latitude: number, longitude: number) => {
        try {
            const response = await ApiGecoding.get('', {
                params: {
                    latlng: `${latitude},${longitude}`,
                },
            });
            if (response.data.status === 'OK') {
                // Address data is in response.data.results
                const address = response.data.results[0].formatted_address as string;
                dispatch({
                    type: 'setCurrentPosition', payload: {
                        latitude,
                        longitude,
                        refPoint: address
                    }
                })
                return address
            } else {
                return `Geocoding request failed with status: ${response.data.status}`
            }
        } catch (error) {
            return `Error while making geocoding request: ${error}`
        }
    };

    const create = async (address: Address) => {
        try {

            const data = await CreteAddressUseCase(address)
            setAddress(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAddressByUser = async () => {
        try {
            dispatch({
                type: "setLoadingPlaces"
            })
            const data = await GetAddressByUserUseCase()
            dispatch({
                type: "setPlaces",
                payload: data.data
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PlacesContext.Provider value={{
            ...state,

            // Methods
            onRegionChangeComplete,
            getAddressByUser,
            create
        }}>
            {children}
        </PlacesContext.Provider>
    )
}