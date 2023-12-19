import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import ClientModelViewModel from './ViewModel'
import styles from './Style'
import EmptyBagsItem from '../../../../components/EmptyBagsItem'
import AddressListItem from '../../../../components/AddressListItem'
import RoundedButton from '../../../../components/RoundedButton'
interface Props extends StackScreenProps<ClientStackParamList, 'AddressListScreen'> { }
const AddressListScreen = ({ navigation }:Props) => {
  const { places, changeRadioButton, checked, createOrder } = ClientModelViewModel()
  return (
    <View style={styles.container} >
        <FlatList
          data={places}
          keyExtractor={data => `${data.lat}${data.lng}${data.address}${data.id}`}
          renderItem={({item}) => <AddressListItem address={item}  checked={checked} changeRadioButton={changeRadioButton} />}
          ListEmptyComponent={<EmptyBagsItem/>}
          contentContainerStyle={styles.containerBody}
          ItemSeparatorComponent={() => (
            <View style={styles.divider} >

            </View>)}
        />
        <View style={{width: "100%", paddingHorizontal: 20, paddingVertical: 20}} >
          {/* <RoundedButton
            text='CONTINUE'
            onPress={createOrder}
          /> */}
          <RoundedButton
            text='CONTINUE'
            isLoading
            onPress={() => navigation.navigate("ClientPaymentFormScreen")}
          />
        </View>
    </View>
  )
}

export default AddressListScreen