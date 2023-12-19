import React from 'react'
import { SafeAreaView, Text, TouchableHighlight, View } from 'react-native'

import { FlatList } from 'react-native-gesture-handler';
import AdminCatgoeryListItem from '../../../../components/AdminCatgoeryListItem';
import styles from './Style';
import CategoryViewMoel from './ViewModel';

const AdminCategoryListScreen = () => {
  const { state, remove } = CategoryViewMoel()

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={state?.categories}
        keyExtractor={category => category.id!}
        renderItem={({ item }) =>

          <AdminCatgoeryListItem category={item} remove={remove} />}
        ListEmptyComponent={<Text>There's not data yet</Text>}
        contentContainerStyle={styles.containerBody}
        ItemSeparatorComponent={() => (
          <View style={styles.divider} >

          </View>)}
      />
    </SafeAreaView>
  )
}

export default AdminCategoryListScreen