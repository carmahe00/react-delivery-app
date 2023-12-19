import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './Style'
import CustomtextInput from '../../../../components/CustomtextInput'
import CategoryViewMoel from './ViewModel'
import RoundedButton from '../../../../components/RoundedButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator'

type Props = NativeStackScreenProps<CategoryStackParamList, 'CategoryUpdateScreen'>;
const CategoryUpdateScreen = ({ route }: Props) => {
    const { category } = route.params

    const { onChange, pickImage, form, sendUpdate } = CategoryViewMoel(category);

    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.imageContainer} onPress={pickImage} >
                {
                    form.image === '' ?
                        <Image
                            source={require('../../../../../../assets/image_new.png')}
                            style={styles.image}
                        /> :
                        <Image
                            source={{
                                uri: form.image
                            }}
                            style={styles.image}
                        />
                }
            </TouchableOpacity>
            <View style={styles.form} >
                <ScrollView >
                    <View style={styles.inputContainer} >
                        <CustomtextInput
                            source={require('../../../../../../assets/categories.png')}
                            placeholder='Name'
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
                    </View>
                </ScrollView>
                <RoundedButton
                    text='Update Category'
                    onPress={sendUpdate}
                />
            </View>

        </View>
    )
}

export default CategoryUpdateScreen