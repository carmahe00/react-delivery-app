import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { Product } from '../../domain/entity/product'
interface Props {
    product: Product,
}
const OrderDetailItemItem = ({ product }: Props) => {
    return (
        <View style={styles.container} >
            <Image
                source={{ uri: product.image1 }}
                style={styles.image}
            />
            <View style={styles.productInfo} >
                <Text style={styles.productName} >{product.name}</Text>
                <Text style={styles.quantity}>amount: {product.order?.quantity}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 15
    },
    productName: {
        fontWeight: "bold"
    },
    quantity: {
        fontSize: 13
    },
    productInfo:{
        marginLeft: 15
    }
})

export default OrderDetailItemItem