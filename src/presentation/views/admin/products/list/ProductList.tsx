import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import AdminProductListViewMoel from './ViewModel'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './Style'
import AdminProductListItem from '../../../../components/AdminProductListItem'
interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductListScreen'> { }
const AdminProductListScreen = ({ route }: Props) => {
    const { state, remove } = AdminProductListViewMoel(route.params.category)
    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={state?.products}
                keyExtractor={products => products.id!}
                renderItem={({ item }) =>

                    <AdminProductListItem product={item} remove={remove} category={route.params.category} />}
                ListEmptyComponent={<Text>There's not product yet</Text>}
                contentContainerStyle={styles.containerBody}
                ItemSeparatorComponent={() => (
                    <View style={styles.divider} >

                    </View>)}
            />
        </SafeAreaView>
    )
}

export default AdminProductListScreen