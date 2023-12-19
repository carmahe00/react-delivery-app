import React from 'react'
import { FlatList, Text, View } from 'react-native'
import ClientProductListViewModel from './ViewModel'
import { StackScreenProps } from '@react-navigation/stack'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import ClientProductListItem from '../../../../components/ClientProductListItem'
import styles from './Style'
interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductListScreen'> { }
const ClientProductListScreen = ({route}:Props) => {
  const { products } = ClientProductListViewModel(route.params.category)
  return (
    <View style={styles.container} >
        <FlatList
          data={products}
          keyExtractor={item => item.id!}
          renderItem={({item})=> <ClientProductListItem product={item} />}
          ItemSeparatorComponent={() => (
            <View style={styles.divider} >

            </View>)}
        />
    </View>
  )
}

export default ClientProductListScreen