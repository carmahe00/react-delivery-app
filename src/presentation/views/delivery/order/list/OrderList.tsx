import React from 'react'
import { FlatList, View, useWindowDimensions } from 'react-native'
import AdminOrderListViewMoel from './ViewModel'
import { TabBar, TabView } from 'react-native-tab-view'
import EmptyBagsItem from '../../../../components/EmptyBagsItem'
import styles from './Style'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator'
import DeliveryOrderListItem from '../../../../components/DeliveryOrderListItem'
interface Props {
  status: 'PAID' | 'DISPATCH' | 'ON-THE-WAY' | 'DELIVERED'
}

const OrderListViewRoute = ({ status }: Props) => {
  const { delivered, dispatch, onTheWay } = AdminOrderListViewMoel(status)
  const navigation = useNavigation<StackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen'>>()
  return (
    <View>
      <FlatList
        data={

          
            status === "DISPATCH" ?
              dispatch :
              status === "ON-THE-WAY" ?
                onTheWay : delivered
        }
        ListEmptyComponent={<EmptyBagsItem />}
        renderItem={({ item }) => <DeliveryOrderListItem navigation={navigation} order={item} />}
        ItemSeparatorComponent={() => (
          <View style={styles.divider} >

          </View>)}
      />
    </View>
  )
}


const DeliveryOrderListScreen = () => {


  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'second', title: 'DISPATCH' },
    { key: 'third', title: 'ON-THE-WAY' },
    { key: 'fourth', title: 'DELIVERED' },
  ]);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
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

export default DeliveryOrderListScreen