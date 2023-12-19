import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MyColors } from '../themes/AppTheme'

interface Props{
    text:string,
    isLoading?:boolean,
    onPress: () => void
}

const RoundedButton = ({text, isLoading , onPress}:Props) => {
    return (
        <TouchableOpacity style={styles.roundedButton} onPress={onPress} disabled={!isLoading} >
            <Text style={styles.textButton} >{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    roundedButton: {
        width: '100%',
        backgroundColor: MyColors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 15
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    }
})
export default RoundedButton