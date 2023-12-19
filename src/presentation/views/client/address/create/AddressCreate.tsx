import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './Style'
import CustomtextInput from '../../../../components/CustomtextInput'
import CategoryViewMoel from './ViewModel'
import RoundedButton from '../../../../components/RoundedButton'
import { StackScreenProps } from '@react-navigation/stack'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressCreateScreen'> { }
const ClientAddressCreateScreen = ({ navigation }:Props) => {
    const { onChange, form, create } = CategoryViewMoel();
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.imageContainer} >
                <Image
                    source={require('../../../../../../assets/map.png')}
                    style={styles.image}
                />
            </TouchableOpacity>
            <View style={styles.form} >
                <ScrollView style={styles.inputContainer} >
                    <CustomtextInput
                        source={require('../../../../../../assets/location.png')}
                        placeholder='Name'
                        keyboardType='default'
                        onChange={onChange}
                        myKey='address'
                    />
                    <CustomtextInput
                        source={require('../../../../../../assets/neighborhood.png')}
                        placeholder='Neighborhood'
                        keyboardType='default'
                        onChange={onChange}
                        myKey='neighborhood'
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("ClientAddressMapScreen")} >
                        <CustomtextInput
                            source={require('../../../../../../assets/ref_point.png')}
                            placeholder='Reference Point'
                            keyboardType='default'
                            onChange={onChange}
                            myKey='refPoint'
                            value={form.refPoint}
                            editable={false}
                        />
                    </TouchableOpacity>
                </ScrollView>
                <RoundedButton
                    text='Create Addresss'
                    onPress={create}
                />
            </View>

        </View>
    )
}

ClientAddressCreateScreen.navigationOptions = {
    tabBarVisible: false, // Hide the tab bar for this screen
};

export default ClientAddressCreateScreen