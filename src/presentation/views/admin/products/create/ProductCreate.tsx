import React from 'react'
import AdminProductCreateViewMoel from './ViewModel'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './Style'
import CustomtextInput from '../../../../components/CustomtextInput'
import RoundedButton from '../../../../components/RoundedButton'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator'
interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductCreateScreen'> { }
const AdminProductCreateScreen = ({ route, navigation }: Props) => {
    const { onChange, pickImage, form, create, file } = AdminProductCreateViewMoel({
        id: route.params.category.id,
        navigation
    })
    return (
        <View style={styles.container} >

            <TouchableOpacity style={styles.imageContainer} onPress={pickImage} >
                {
                    !file || file?.length === 0 ?
                        <Image
                            source={require('../../../../../../assets/image_new.png')}
                            style={[styles.image, { width: 'auto' }]}
                        /> :

                        <FlatList
                            horizontal={true}
                            data={file}
                            renderItem={({ item }) => <Image
                                key={item.id}

                                source={{
                                    uri: item.uri
                                }}
                                style={styles.image}
                            />}
                        />


                }
            </TouchableOpacity>

            <View style={styles.form} >
                <ScrollView style={styles.inputContainer} >
                    
                    <View style={styles.categoryInfo} >
                        <Image
                            style={styles.imageCategory}
                            source={require('../../../../../../assets/menu.png')}
                        />
                        <Text>Category:</Text>
                        <Text>{route.params.category.name}</Text>
                    </View>
                    <CustomtextInput
                        source={require('../../../../../../assets/categories.png')}
                        placeholder='Name of product'
                        keyboardType='default'
                        onChange={onChange}
                        myKey='name'
                    />
                    <CustomtextInput
                        source={require('../../../../../../assets/description.png')}
                        placeholder='Description'
                        keyboardType='default'
                        onChange={onChange}
                        myKey='description'
                    />
                    <CustomtextInput
                        source={require('../../../../../../assets/price.png')}
                        placeholder='Price of product'
                        keyboardType='numeric'
                        onChange={onChange}
                        myKey='price'
                    />
                    <View style={styles.buttonContainer} >
                        <RoundedButton
                            text='Create Product'
                            onPress={create}
                        />
                    </View>
                </ScrollView>
            </View>

        </View>
    )
}

export default AdminProductCreateScreen