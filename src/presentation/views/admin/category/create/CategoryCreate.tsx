import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from './Style'
import CustomtextInput from '../../../../components/CustomtextInput'
import CategoryViewMoel from './ViewModel'
import RoundedButton from '../../../../components/RoundedButton'

const CategoryCreateScreen = () => {
    const { onChange, pickImage, form, create } = CategoryViewMoel()
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
                <ScrollView style={styles.inputContainer} >
                    <CustomtextInput
                        source={require('../../../../../../assets/categories.png')}
                        placeholder='Name'
                        keyboardType='default'
                        onChange={onChange}
                        myKey='name'
                    />
                    <CustomtextInput
                        source={require('../../../../../../assets/categories.png')}
                        placeholder='Description'
                        keyboardType='default'
                        onChange={onChange}
                        myKey='description'
                    />
                </ScrollView>
                <RoundedButton
                    text='Create Category'
                    onPress={create}
                />
            </View>

        </View>
    )
}

CategoryCreateScreen.navigationOptions = {
    tabBarVisible: false, // Hide the tab bar for this screen
  };

export default CategoryCreateScreen