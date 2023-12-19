import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import styles from './Styles'
import { StackScreenProps } from '@react-navigation/stack'
import { FlatList } from 'react-native-gesture-handler'
import OrderDetailItemItem from '../../../../components/OrderDetailItem'
import AdminOrderDetailViewModel from './ViewModel'
import RoundedButton from '../../../../components/RoundedButton'
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator'
interface Props extends StackScreenProps<DeliveryOrderStackParamList, "DeliveryOrderDetailScreen"> { }
const AdminOrderDetailScreen = ({ navigation, route }: Props) => {
    const { order } = route.params
    const { total,
        updateToOnTheWay,
    } = AdminOrderDetailViewModel(order)
    return (
        <View style={styles.container} >
            <View style={styles.products} >
                <FlatList
                    data={order.products}
                    keyExtractor={item => item.id!}
                    renderItem={({ item }) => <OrderDetailItemItem product={item} />}
                    contentContainerStyle={styles.containerList}

                />
            </View>
            <View style={styles.info} >
                <ScrollView>
                    <View style={styles.infoRow} >
                        <View style={styles.infoText} >
                            <Text style={styles.infoTitle} >Order date:</Text>
                            <Text style={styles.infoDescription} >{new Date(order.createdAt!).getDay()}/{new Date(order.createdAt!).getMonth() + 1}/{new Date(order.createdAt!).getFullYear()} {new Date(order.createdAt!).getHours()}:{new Date(order.createdAt!).getMinutes()}</Text>
                        </View>
                        <Image
                            source={require("../../../../../../assets/reloj.png")}
                            style={styles.watchImage}
                        />
                    </View>

                    <View style={styles.infoRow} >
                        <View style={styles.infoText} >
                            <Text style={styles.infoTitle} >Cleint and Phone</Text>
                            <Text style={styles.infoDescription} >{order.client?.name} {order.client?.lastName} - {order.client?.phone}</Text>
                        </View>
                        <Image
                            source={require("../../../../../../assets/user.png")}
                            style={styles.watchImage}
                        />
                    </View>

                    <View style={styles.infoRow} >
                        <View style={styles.infoText} >
                            <Text style={styles.infoTitle} >delivery address</Text>
                            <Text style={styles.infoDescription} >{order.address?.address} - {order.address?.neighborhood}</Text>
                        </View>
                        <Image
                            source={require("../../../../../../assets/location.png")}
                            style={styles.watchImage}
                        />
                    </View>






                    <View style={styles.infoRow} >
                        <View style={styles.infoText} >
                            <Text style={styles.infoTitle} >Delivery assigned</Text>
                            <Text style={styles.infoDescription} >{order.delivery?.name} {order.delivery?.lastName} - {order.client?.phone}</Text>
                        </View>
                        <Image
                            source={require("../../../../../../assets/my_user.png")}
                            style={styles.watchImage}
                        />
                    </View>

                    <View style={styles.totalInfo}>
                        <Text style={styles.total} >Total: ${total}</Text>
                        <View style={styles.button} >
                            {
                                order.status === "DISPATCH" &&
                                <RoundedButton
                                    isLoading
                                    text='Start Order'
                                    onPress={updateToOnTheWay}
                                />
                            }
                            {
                                order.status === "ON-THE-WAY" &&
                                <RoundedButton
                                    isLoading
                                    text='GO MAP'
                                    onPress={() => navigation.navigate("DeliveryOrderMapScreen", { order })}
                                />
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default AdminOrderDetailScreen