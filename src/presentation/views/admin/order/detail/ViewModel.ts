import React, { useEffect, useState } from 'react'
import { Order } from '../../../../../domain/entity/order'
import GetDeleveryMenuUserUseCase from '../../../../../domain/useCases/user/GetDeleveryMenuUser'
import { User } from '../../../../../domain/entity/user'
import { UpdateOrderToDispatchedUseCase } from '../../../../../domain/useCases/order/UpdateOrderToDispatched'
interface DropDownProps {
    label: string, value: string
}
const DeliveryOrderDetailViewModel = (order: Order) => {
    const [total, setTotal] = useState(0.0)
    const [deliveryMan, setDeliveryMan] = useState<User[]>([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<DropDownProps[]>([]);
    useEffect(() => {
        if (total === 0.0)
            getTotal()
        getDeliveryMen()
    }, [total])

    useEffect(() => {
        if (deliveryMan.length)
            setDropDownItems()
    }, [deliveryMan])


    const setDropDownItems = () => {
        let itemsDeliveryMan: DropDownProps[] = []
        deliveryMan.forEach(d => {
            itemsDeliveryMan.push({
                label: `${d.name} ${d.lastName}`,
                value: d.id!
            })
        })
        setItems(itemsDeliveryMan)
    }

    const getDeliveryMen = async () => {
        const result = await GetDeleveryMenuUserUseCase()
        setDeliveryMan(result)
    }

    const dispatchOrder = async () => {
        if (!value)
            return
        order.idDelivery = {
            id: value,

        }
        await UpdateOrderToDispatchedUseCase(order)
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
        open,
        value,
        items,
        setOpen,
        setValue,
        setItems,
        dispatchOrder
    }
}

export default DeliveryOrderDetailViewModel