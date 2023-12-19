import React from 'react'
import { Product } from '../../domain/entity/product'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
interface Props {
    product: Product
    addItem: (product: Product) => void
    subtractItem: (product: Product) => void
    deleteItem: (product: Product) => void
}
const ShoppingBagListItem = ({ product, addItem, deleteItem, subtractItem }: Props) => {
    return (
        <View style={styles.container} >
            <View style={styles.imageContainer} >
                <Image
                    style={styles.image}
                    source={{ uri: product.image1 }}
                />
            </View>
            <View style={styles.productInfo} >
                <View style={styles.containerText} >
                    <Text style={styles.title} >{product.name}</Text>
                    <Text style={styles.price} >${product.quantity! * product.price}</Text>
                </View>
                <View style={styles.productAction} >
                    <TouchableOpacity style={styles.actionLess} onPress={() => subtractItem(product)} >
                        <Text style={styles.actionText} >-</Text>
                    </TouchableOpacity>
                    <View style={styles.quantity} >
                        <Text style={styles.actionText} >{product.quantity}</Text>
                    </View>
                    <TouchableOpacity style={styles.actionAdd} onPress={() => addItem(product)} >
                        <Text style={styles.actionText} >+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.delete} onPress={() => deleteItem(product)} >
                        <Image
                            style={styles.deleteImage}
                            source={require("../../../assets/trash.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 70,
        backgroundColor: 'white',
        alignItems: "center",
        paddingHorizontal: 5,
    },
    imageContainer: {

    },
    containerText: {
        flexDirection: "row",
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 15
    },
    title: {
        color: "black",
        fontSize: 14,
        flex: 1

    },
    productInfo: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 5,
        gap: 5,
    },
    productAction: {
        flexDirection: "row"
    },
    price: {
        fontWeight: "bold"
    },
    actionText: {
        color: "black",
        fontSize: 15
    },
    actionLess: {
        backgroundColor: "#f2f2f2",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "center",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    actionAdd: {
        backgroundColor: "#f2f2f2",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: "center",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },

    delete: {
        marginLeft: "auto"
    },
    deleteImage: {
        width: 25,
        height: 25
    },
    quantity: {
        backgroundColor: "#f2f2f2",
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf: "center",
    },
})

export default ShoppingBagListItem