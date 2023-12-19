import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Order } from '../../domain/entity/order'
import { StackNavigationProp } from '@react-navigation/stack'
import { DeliveryOrderStackParamList } from '../navigator/DeliveryOrderStackNavigator'
interface Props {
    order: Order,
    navigation: StackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen'>
}
const DeliveryOrderListItem = ({ order, navigation }: Props) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("DeliveryOrderDetailScreen", {order})} >
            <View style={styles.container} >
                <Text style={styles.order} >Order #{order.id}</Text>
                <Text style={{ ...styles.info, marginTop: 10 }}>Date: {order.createdAt && new Date(order.createdAt).getDay()}/{order.createdAt && (new Date(order.createdAt).getMonth() + 1)}/{order.createdAt && (new Date(order.createdAt).getFullYear())}/{order.createdAt && new Date(order.createdAt).getHours()}:{order.createdAt && new Date(order.createdAt).getMinutes()}</Text>
                <Text style={styles.info}>Client: {order.client?.name}</Text>
                <Text style={styles.info}>Address: {order.address?.address}</Text>
                <Text style={styles.info}>Neighborhood: {order.address?.neighborhood}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    order: {
        fontWeight: "bold",
        fontSize: 18,
        color: "black",
        marginTop: 20
    },
    info: {
        fontSize: 13
    }
})

export default DeliveryOrderListItem