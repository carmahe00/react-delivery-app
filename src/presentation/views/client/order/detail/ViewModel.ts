import { useEffect, useState } from 'react'
import { Order } from '../../../../../domain/entity/order'
import { UpdateOrderToOnTheWayUseCase } from '../../../../../domain/useCases/order/UpdateOrderToOnTheWay'

const ClientOrderDetailViewModel = (order: Order) => {
    const [total, setTotal] = useState(0.0)
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
        updateToOnTheWay
    }
}

export default ClientOrderDetailViewModel