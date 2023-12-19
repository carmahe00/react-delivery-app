import React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { StackNavigationProp } from '@react-navigation/stack'
import { Product } from '../../domain/entity/product'
import { ClientStackParamList } from '../navigator/ClientStackNavigator'
interface Props {
    product: Product
}
const ClientProductListItem = ({ product }: Props) => {
    const navigation = useNavigation<StackNavigationProp<ClientStackParamList>>()
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ClientProductDetailScreen', {product})} >
            

                <View style={styles.info} >
                    <Text style={styles.title} >{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.price}>{product.price}$</Text>
                </View>
                <Image
                    style={styles.image}
                    source={{ uri: product.image1 }}
                />
            
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 90,
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
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold'
    },
    containerButton:{
        gap: 5
    }
})

export default ClientProductListItem