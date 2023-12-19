import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { StackNavigationProp } from '@react-navigation/stack'
import { Product } from '../../domain/entity/product'
import { ProductStackParamList } from '../navigator/AdminProductNavigator'
import { Category } from '../../domain/entity/category'
interface Props {
    product: Product,
    category: Category,
    remove: (id: string) => void
}
const AdminProductListItem = ({ product, remove, category }: Props) => {
    const navigation = useNavigation<StackNavigationProp<ProductStackParamList>>()
    return (
        <View style={styles.container} >
            <TouchableOpacity style={{flexDirection: 'row'}}   >

                <Image
                    style={styles.image}
                    source={{ uri: product.image1 }}
                />
                <View style={styles.info} >
                    <Text style={styles.title} >{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.price}>{product.price}$</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.containerButton} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('AdminProductUpdateScreen', {product, category})}
                >
                    <Image
                        style={styles.actionUpdate}
                        source={require("../../../assets/edit.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remove(product.id!)} >
                    <Image
                        style={styles.actionUpdate}
                        source={require("../../../assets/trash.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 90,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    info: {
        marginLeft: 15
    },
    title: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 15
    },
    description: {
        color: 'gray',
        fontWeight: "bold",
        fontSize: 12
    },
    actionUpdate: {
        width: 25,
        height: 25,
        marginRight: 0,
    },
    price:{
        color: 'green',
        fontSize: 12
    },
    containerButton:{
        gap: 5
    }
})

export default AdminProductListItem