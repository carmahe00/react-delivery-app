import React, { useEffect } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import CreditCard from 'react-native-credit-card-form-ui';
import ClientPaymentViewModel from './ViewModel';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Style';
import CustomtextInput from '../../../../components/CustomtextInput';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';


interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentFormScreen'> { }


const ClientPaymentFormScreen = ({ navigation }: Props) => {
  const { creditCardRef,
    getIdentificationTypes,
    onChange,
    handleSubmit,
    open,
    value,
    cardToken,
    items,
    setItems,
    setOpen,
    setValue } = ClientPaymentViewModel()
  useEffect(() => {
    getIdentificationTypes()

  }, [])

  useEffect(() => {
    if (cardToken)
      navigation.navigate("ClientPaymentsInstallmentsScreen", {
        cardToken: cardToken
      })
  }, [cardToken])



  return (
    <View style={styles.container} >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
        style={styles.form}
      >
        <CreditCard ref={creditCardRef}
          labels={{
            holder: "owner",
            cvv: "cvv",
            expiration: "expiration"
          }}
          placeholders={{
            cvv: "xxx",
            expiration: "MM/YYYY",
            number: "0000 0000 0000 0000",
            holder: "Name's Owner"
          }}
        />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <CustomtextInput
          source={require('../../../../../../assets/document.png')}
          placeholder='Number ID'
          keyboardType='default'
          onChange={onChange}
          myKey='identificationNumber'
        />
        <View style={styles.buttonContainer} >

          <TouchableOpacity onPress={handleSubmit} >
            <Image
              style={styles.check}
              source={require("../../../../../../assets/orders.png")}
            />
          </TouchableOpacity>
          {/* <RoundedButton text='CONTINUE' onPress={handleSubmit} /> */}
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}



export default ClientPaymentFormScreen