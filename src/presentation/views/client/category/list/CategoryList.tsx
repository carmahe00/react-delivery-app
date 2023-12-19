import React from 'react'
import { StyleSheet, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import LoadingIndicator from '../../../../components/LoadingIndicator';

import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import CategoryPoster from '../../../../components/CategoryPoster';
import CategoryViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
type Props = StackScreenProps<ClientStackParamList, 'ClientCategoryListScreen'>;
const ClientCategoryListScreen = ({navigation}:Props) => {
  const { categories, width, height } = CategoryViewModel();

    if (!categories || !categories.length)
        return <LoadingIndicator />
    return (
        <View style={[styles.conatiner, {top: height*0.1}]} >
            <Carousel
                width={width}
                height={height}
                data={categories}
                renderItem={({ item }) => <CategoryPoster height={height*0.62} category={item} width={width-70} navigation={navigation} />}
                scrollAnimationDuration={5000}
                modeConfig={{
                    snapDirection: 'left',
                    stackInterval: 30
                }}
                
                mode='horizontal-stack'
            />
        </View>
    )
}
const styles = StyleSheet.create({
  conatiner:{
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
      position: "absolute"
  }
});
export default ClientCategoryListScreen