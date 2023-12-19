import React from 'react'
import { Text, View } from 'react-native'
import ShoppingModelListViewModel from './ViewModel'
import { FlatList } from 'react-native-gesture-handler'
import ShoppingBagListItem from '../../../components/ShoppingBagListItem'
import styles from './Style'
import RoundedButton from '../../../components/RoundedButton'
import EmptyBagsItem from '../../../components/EmptyBagsItem'
import { ClientStackParamList } from '../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
interface Props extends StackScreenProps<ClientStackParamList, 'ShoppingBagListScreen'> { }
const ShoppingBagListScreen = ({navigation}:Props) => {
    const { products, total, addItem, subtractItem, deleteItem } = ShoppingModelListViewModel()
    return (
        <View style={styles.container} >
            <FlatList
                data={products}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => <ShoppingBagListItem
                    product={item}
                    deleteItem={deleteItem}
                    addItem={addItem}
                    subtractItem={subtractItem}
                />}
                contentContainerStyle={{flexGrow: 1}}
                ListEmptyComponent={<EmptyBagsItem />}
                ItemSeparatorComponent={() => (
                    <View style={styles.divider} >

                    </View>)}


            />
            <View style={styles.totalToPay}>
                <View style={styles.totalInfo} >
                    <Text style={styles.totalText} >Total:</Text>
                    <Text>${total}</Text>
                </View>
                <View style={styles.buttonAdd} >
                    <RoundedButton text='CONFIRM ORDER' isLoading onPress={() => navigation.navigate("AddressListScreen")} />
                </View>
            </View>
        </View>
    )
}

export default ShoppingBagListScreen