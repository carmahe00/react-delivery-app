import { useFocusEffect } from '@react-navigation/native';
import React, { useContext } from 'react';
import { OrderContext } from '../../../../context/order/OrderContext';
import { AuthContext } from '../../../../context/AuthContext';
const ClientOrderListViewMoel = (status: 'PAID' | 'DISPATCH' | 'ON-THE-WAY' | 'DELIVERED') => {
    const { getAllByClientStatus, state: { delivered, paid, onTheWay, dispatch } } = useContext(OrderContext);
    const { state } = useContext(AuthContext)
    useFocusEffect(React.useCallback(() => {
        if (state)
            if (state.user)
                getAllByClientStatus(state.user.id!, status)

    }, [state]))

    return {
        delivered,
        paid,
        onTheWay,
        dispatch
    }
}

export default ClientOrderListViewMoel