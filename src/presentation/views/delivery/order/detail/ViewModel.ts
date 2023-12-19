import { useEffect, useState } from 'react'
import { Order } from '../../../../../domain/entity/order'
import { User } from '../../../../../domain/entity/user'
import { UpdateOrderToOnTheWayUseCase } from '../../../../../domain/useCases/order/UpdateOrderToOnTheWay'

const AdminOrderDetailViewModel = (order: Order) => {
    const [total, setTotal] = useState(0.0)
    const [deliveryMan, setDeliveryMan] = useState<User[]>([]);
    useEffect(() => {
        if (total === 0.0)
            getTotal()
    }, [total])

    const updateToOnTheWay = async () => {
        
        await UpdateOrderToOnTheWayUseCase(order)
    }

    const getTotal = () => {
        order.products.forEach(p => {
            setTotal((prevTotal) => prevTotal + (p.price * p.order?.quantity!));
        })
    }
    return {
        total,
        getTotal,
        deliveryMan,
        updateToOnTheWay
    }
}

export default AdminOrderDetailViewModel