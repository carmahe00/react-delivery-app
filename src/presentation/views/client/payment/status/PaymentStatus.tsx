import React from 'react'
import { Image, Text, View } from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import styles from './Style'
import RoundedButton from '../../../../components/RoundedButton'
interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentStatusScreen'> { }
const ClientPaymentStatusScreen = ({ route, navigation }: Props) => {
    const { paymentData } = route.params
    console.log(paymentData)
    return (
        <View style={styles.container} >
            {
                paymentData.status === "approved" ?
                    <Image
                        style={styles.image}
                        source={require("../../../../../../assets/checked.png")}
                    /> :
                    <Image
                        style={styles.image}
                        source={require("../../../../../../assets/cancel.png")}
                    />
            }
            {
                paymentData.status === "approved" ?
                    <Text style={styles.description} >Order processed {paymentData.payment_method_id}  **** {paymentData.card.last_four_digits}</Text> :
                    <Text style={styles.description} >Order failed</Text>

            }

            {
                paymentData.status === "approved" &&
                <Text style={styles.description} >See your order in order section</Text>
            }
            <View style={styles.button} >
                <RoundedButton text='Finish Purchase' isLoading onPress={() => navigation.replace("ClientCategoryListScreen")} />
            </View>
        </View>
    )
}

export default ClientPaymentStatusScreen