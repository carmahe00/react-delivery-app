import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Rol } from '../../domain/entity/rol';
import { MyColors } from '../themes/AppTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/MainStackNavigator';

interface Props {
    role: Rol,
    height?: number,
    width?: number,
    index?: number,
    navigation: NativeStackNavigationProp<RootStackParamList, "RolesScreen", undefined>
}
const RolePoster = ({ height = 370, width = 320, role, navigation }: Props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                if (role.name === "ADMIN")
                    navigation.navigate("AdminTabsNavigator")
                else if (role.name === "CLIENT")
                    navigation.navigate("ClientTabsNavigator")
                else if (role.name === "DELIVERY")
                    navigation.navigate("DeliveryTabsNavigator")
            }}
            style={[styles.container, { height, width }]}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer} >
                <Image source={{ uri: role.image }} style={styles.image} />
                <View style={styles.titleContainer} >
                    <Text style={styles.title} >{role.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        paddingHorizontal: 7,
        paddingBottom: 20
    },
    imageContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 7,
        elevation: 10,
        borderRadius: 18,
    },
    titleContainer: {

        height: 50,
        backgroundColor: MyColors.primary,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        resizeMode: 'contain',

    },
    title: {
        color: 'white'
    }
});

export default RolePoster