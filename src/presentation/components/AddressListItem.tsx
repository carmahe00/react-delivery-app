import React from 'react'
import { Address } from '../../domain/entity/address'
import { StyleSheet, Text, View } from 'react-native'
import { RadioButton } from 'react-native-paper';
interface Props {
    address: Address
    checked:string
    changeRadioButton: (address:Address) => void
}
const AddressListItem = ({ address, checked, changeRadioButton }: Props) => {
    return (
        <View style={styles.container} >
            <View style={styles.info} >
                <RadioButton
                    
                    value={address.id!}
                    status={checked === address.id ? 'checked' : 'unchecked'}
                    onPress={() => changeRadioButton(address)}
                />
                <View style={styles.infoAddress} >
                    <Text style={styles.address} >{address.address}</Text>
                    <Text style={styles.neighborhood} >{address.neighborhood}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        justifyContent: "center"
    },
    info:{
        flexDirection: 'row'
    },
    address:{
        fontWeight: "bold",
        fontSize: 13
    },
    neighborhood:{
        fontSize: 12
    },
    infoAddress:{
        marginLeft: 5
    }
})

export default AddressListItem