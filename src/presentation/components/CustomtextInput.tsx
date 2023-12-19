import React from 'react'
import { Image, KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native'
interface Props {
    source: any,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean,
    value?: string,
    onChange: <K extends Object>(value: K, field: any) => void,
    myKey:string,
    editable?:boolean
}
const CustomtextInput = ({
    source,
    keyboardType='default',
    onChange,
    secureTextEntry=false,
    placeholder,
    myKey,
    editable=true,
    value
}:Props) => {
    return (
        <View style={styles.formInput} >
            <Image
                style={styles.formIcon}
                source={source}
            />
            <TextInput
                value={value}
                style={styles.formTextInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                onChangeText={value => onChange(value, myKey)}
                editable={editable}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formTextInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#2D4356',
        flex: 1,
        marginLeft: 15
    },
    formIcon: {
        height: 25,
        width: 25,
        alignSelf: 'flex-end'
    },
    formInput: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
})

export default CustomtextInput