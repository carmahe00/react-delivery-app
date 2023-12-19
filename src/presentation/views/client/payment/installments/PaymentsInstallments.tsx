import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import ClientPaymentViewModel from './ViewModel'
import DropDownPicker from 'react-native-dropdown-picker'
import styles from './Style'
import RoundedButton from '../../../../components/RoundedButton'
import { MyColors } from '../../../../themes/AppTheme'
interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentsInstallmentsScreen'> { }
const ClientPaymentsInstallmentsScreen = ({ route, navigation }: Props) => {
  const { cardToken } = route.params
  const { open,
    items,
    value,
    isLoading,
    paymentData,
    responseMessage,
    setOpen,
    getInstallments,
    setValue,
    setItems,
    createPayament } = ClientPaymentViewModel(cardToken)
  useEffect(() => {
    getInstallments()
  }, [])

  useEffect(() => {
    if (paymentData !== null && paymentData !== undefined)
      navigation.replace("ClientPaymentStatusScreen", { paymentData })
  }, [paymentData])


  return (
    <View style={styles.container} >
      <Text style={styles.textNumberInstallments} >Number of installments</Text>
      <View style={styles.dropdownContainer} >
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color={MyColors.primary} />
        </View>
      )}
      <Text style={styles.orderCreatedText} >{responseMessage}</Text>
      <View>
        <RoundedButton
          text='Process payment'
          onPress={createPayament}
          isLoading
        />
      </View>
    </View>
  )
}

export default ClientPaymentsInstallmentsScreen