import React from 'react'
import { FlatList, View, useWindowDimensions } from 'react-native'
import AdminOrderListViewMoel from './ViewModel'
import { TabBar, TabView } from 'react-native-tab-view'
import EmptyBagsItem from '../../../../components/EmptyBagsItem'
import OrderListItem from '../../../../components/OrderListItem'
import styles from './Style'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AdminOrderStackParamList } from '../../../../navigator/AdminOrderStackNavigator'
interface Props {
  status: 'PAID' | 'DISPATCH' | 'ON-THE-WAY' | 'DELIVERED'
}

const OrderListViewRoute = ({ status }: Props) => {
  const { delivered, dispatch, onTheWay, paid } = AdminOrderListViewMoel(status)
  const navigation = useNavigation<StackNavigationProp<AdminOrderStackParamList, 'AdminOrderListScreen'>>()
  return (
    <View>
      <FlatList
        data={

          status === "PAID" ?
            paid :
            status === "DISPATCH" ?
              dispatch :
              status === "ON-THE-WAY" ?
                onTheWay : delivered
        }
        ListEmptyComponent={<EmptyBagsItem />}
        renderItem={({ item }) => <OrderListItem navigation={navigation} order={item} />}
        ItemSeparatorComponent={() => (
          <View style={styles.divider} >

          </View>)}
      />
    </View>
  )
}


const AdminOrderListScreen = () => {


  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'PAID' },
    { key: 'second', title: 'DISPATCH' },
    { key: 'third', title: 'ON-THE-WAY' },
    { key: 'fourth', title: 'DELIVERED' },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'first':
        return <OrderListViewRoute status="PAID" />;
      case 'second':
        return <OrderListViewRoute status="DISPATCH" />;
      case 'third':
        return <OrderListViewRoute status="ON-THE-WAY" />;
      case 'fourth':
        return <OrderListViewRoute status="DELIVERED" />;
      default:
        return <OrderListViewRoute status="PAID" />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'black' }}
          scrollEnabled
          style={{ backgroundColor: "#f77f00", height: 70, alignItems: "center", justifyContent: "center" }}

        />
      )}
    />
  );
}

export default AdminOrderListScreen