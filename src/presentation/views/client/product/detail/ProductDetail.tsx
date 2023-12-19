import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import styles from './Style'
import Carousel from 'react-native-reanimated-carousel'
import ClienteProductDetailViewModel from './ViewModel'
import { ScrollView } from 'react-native-gesture-handler'
import RoundedButton from '../../../../components/RoundedButton'
interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductDetailScreen'> { }
const ClientProductDetailScreen = ({ route, navigation }: Props) => {
    const { product } = route.params
    const { height, width, productImages, addItem, removeItem, quantity, price, addToBag } = ClienteProductDetailViewModel(route.params.product)
    return (
        <View style={styles.container} >
            
            <Carousel
                width={width}
                height={height}
                data={productImages}
                renderItem={({ item }) => <Image
                    source={{ uri: item }}
                    style={styles.productImages}
                />}
                scrollAnimationDuration={1000}
                autoPlayInterval={5000}
                autoPlay
                modeConfig={{

                    stackInterval: 30
                }}


            />
            <View style={styles.productDetail} >
                <ScrollView>
                    <View style={styles.productInfo} >
                        <Text style={styles.name} >{product.name}</Text>
                        <View style={styles.divider} ></View>
                        <Text style={styles.descriptionTitle} >Description</Text>
                        <Text style={styles.descriptionContent}>{product.description}</Text>
                        <View style={styles.divider} ></View>
                        <Text style={styles.descriptionTitle} >Price</Text>
                        <Text style={styles.descriptionContent}>${product.price}</Text>
                        <View style={styles.divider} ></View>

                        <Text style={styles.descriptionTitle} >Your Order:</Text>
                        <Text style={styles.descriptionContent}>Amount: {quantity}</Text>
                        <Text style={styles.descriptionContent}>Price c/u {price}</Text>
                        <View style={styles.divider} ></View>
                    </View>
                    <View style={styles.productActions} >
                        <TouchableOpacity style={styles.actionLess} onPress={removeItem} >
                            <Text style={styles.actionText} >-</Text>
                        </TouchableOpacity>
                        <View style={styles.quantity} >
                            <Text style={styles.actionText} >{quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.actionAdd} onPress={addItem} >
                            <Text style={styles.actionText} >+</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonAdd} >
                            <RoundedButton text='ADD TO BAG' onPress={addToBag} isLoading />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.back} onPress={() => navigation.pop()} >
                <Image
                    style={styles.backImage}
                    source={require("../../../../../../assets/back.png")}
                />
            </TouchableOpacity>
        </View>
    )
}

export default ClientProductDetailScreen