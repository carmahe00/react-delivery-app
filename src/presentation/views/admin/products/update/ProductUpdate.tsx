import React from 'react'
import AdminProductUpdateViewMoel from './ViewModel'
import { FlatList, Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './Style'
import CustomtextInput from '../../../../components/CustomtextInput'
import RoundedButton from '../../../../components/RoundedButton'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator'
interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductUpdateScreen'> { }
const AdminProductUpdateScreen = ({ route, navigation }: Props) => {
    const { onChange, pickImage, form, updateProduct, file } = AdminProductUpdateViewMoel({
        category: route.params.category,
        navigation,
        product: route.params.product
    })
    return (
        <View style={styles.container} >

            <TouchableOpacity style={styles.imageContainer} onPress={pickImage} >
                {
                    file && file.length ?
                        <FlatList
                            horizontal={true}
                            data={file}
                            renderItem={({ item }) => <Image
                                key={item.uri}

                                source={{
                                    uri: item.uri
                                }}
                                style={styles.image}
                            />}
                            contentContainerStyle={{ padding: 5}}
                            ItemSeparatorComponent={() => (
                                <View style={styles.divider} >
            
                                </View>)}
                        />

                        : <FlatList
                            horizontal={true}
                            data={[form.image1, form.image2, form.image3]}
                            renderItem={({ item }) => <Image
                                key={item}

                                source={{
                                    uri: item
                                }}
                                style={styles.image}
                            />}
                            contentContainerStyle={{ padding: 5}}
                            ItemSeparatorComponent={() => (
                                <View style={styles.divider} >
            
                                </View>)}
                            
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
                        value={form.name}
                    />
                    <CustomtextInput
                        source={require('../../../../../../assets/description.png')}
                        placeholder='Description'
                        keyboardType='default'
                        onChange={onChange}
                        myKey='description'
                        value={form.description}
                    />
                    <CustomtextInput
                        source={require('../../../../../../assets/price.png')}
                        placeholder='Price of product'
                        keyboardType='numeric'
                        onChange={onChange}
                        myKey='price'
                        value={form.price.toString()}
                    />
                    <View style={styles.buttonContainer} >
                        <RoundedButton
                            text='Update Product'
                            onPress={updateProduct}
                        />
                    </View>
                </ScrollView>
            </View>

        </View>
    )
}

export default AdminProductUpdateScreen