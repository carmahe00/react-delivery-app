import React from 'react'
import { Category } from '../../domain/entity/category'
import { Image, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { StackNavigationProp } from '@react-navigation/stack'
import { CategoryStackParamList } from '../navigator/AdminCategoryNavigator'
interface Props {
    category: Category,
    remove: (id: string) => void
}
const AdminCatgoeryListItem = ({ category, remove }: Props) => {
    const navigation = useNavigation<StackNavigationProp<CategoryStackParamList>>()
    return (
        <View style={styles.container} >
            <TouchableOpacity style={{flexDirection: 'row'}}  onPress={() => navigation.navigate('AdminProductNavigator', {category})} >

                <Image
                    style={styles.image}
                    source={{ uri: category.image }}
                />
                <View style={styles.info} >
                    <Text style={styles.title} >{category.name}</Text>
                    <Text style={styles.description}>{category.description}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.containerButton} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('CategoryUpdateScreen', { category })}
                >
                    <Image
                        style={styles.actionUpdate}
                        source={require("../../../assets/edit.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remove(category.id!)} >
                    <Image
                        style={styles.actionUpdate}
                        source={require("../../../assets/trash.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        height: 70,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    info: {
        marginLeft: 15
    },
    title: {
        color: 'black',
        fontWeight: "bold",
        fontSize: 15
    },
    description: {
        color: 'gray',
        fontWeight: "bold",
        fontSize: 12
    },
    actionUpdate: {
        width: 25,
        height: 25,
        marginRight: 0,
    },
    containerButton:{
        gap: 5
    }
})

export default AdminCatgoeryListItem