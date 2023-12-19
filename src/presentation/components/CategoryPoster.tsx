import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../../domain/entity/category';
import { ClientStackParamList } from '../navigator/ClientStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props{
    category:Category,
    height?: number,
    width?: number,
    index?:number,
    navigation: StackNavigationProp<ClientStackParamList, "ClientCategoryListScreen", undefined>
}
const CategoryPoster = ({height = 400, width = 320, category, navigation  }:Props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("ClientProductListScreen", {category})
            }}
            style={[styles.container, { height, width }]}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer} >
                <Image source={{ uri: category.image }} style={styles.image} />
                <View style={styles.titleContainer} >
                    <Text style={styles.title} >{category.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        paddingHorizontal: 7,
        paddingBottom: 20,
        alignSelf: 'center'
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
    titleContainer:{
        
        height: 50,
        backgroundColor: "white",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20
    },
    image: {
        flex: 1,
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: '100'
    }
});

export default CategoryPoster