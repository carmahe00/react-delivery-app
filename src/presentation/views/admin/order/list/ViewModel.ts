import { useFocusEffect } from '@react-navigation/native';
import React, { useContext } from 'react';
import { OrderContext } from '../../../../context/order/OrderContext';
const AdminOrderListViewMoel = (status: 'PAID' | 'DISPATCH' | 'ON-THE-WAY' | 'DELIVERED') => {
    const { getAllByStatus, state:{ delivered, paid, onTheWay, dispatch } } = useContext(OrderContext);
    useFocusEffect(React.useCallback(() => {
        getAllByStatus(status)
        
    }, []))

    return {
        delivered,
        paid,
        onTheWay,
        dispatch
    }
}

export default AdminOrderListViewMoel