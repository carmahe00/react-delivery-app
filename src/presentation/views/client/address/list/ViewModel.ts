import React, { useContext, useState } from 'react'
import { PlacesContext } from '../../../../context/place/PlaceContext';
import { useFocusEffect } from '@react-navigation/native';
import { Address } from '../../../../../domain/entity/address';
import { AuthContext } from '../../../../context/AuthContext';
import { CreateOrderUseCase } from '../../../../../domain/useCases/order/CreateOrder';
import { Order } from '../../../../../domain/entity/order';
import { ShoppingBagContext } from '../../../../context/shopping/ShoppingProvider';
import { ToastAndroid } from 'react-native';

const ClientModelViewModel = () => {
    const { getAddressByUser, places } = useContext(PlacesContext);
    const { setAddress, state } = useContext(AuthContext);
    const { state: stateShoppingBag } = useContext(ShoppingBagContext);

    const createOrder = async () => {
        if (!state?.user)
            return
        const order: Order = {
            idClient: state.user,
            idAddress: state.user.address?.id!,
            products: stateShoppingBag.products
        }
        const result = await CreateOrderUseCase(order)
        ToastAndroid.show("Order created", ToastAndroid.BOTTOM)
    }

    const [checked, setChecked] = useState("")
    useFocusEffect(React.useCallback(() => {
        getAddressByUser()
    }, []))
    const changeRadioButton = (address: Address) => {
        setChecked(address.id!)
        setAddress(address)
    }
    return {
        places,
        changeRadioButton,
        checked,
        createOrder
    }
}

export default ClientModelViewModel