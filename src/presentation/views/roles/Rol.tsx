import React from 'react'
import {  StyleSheet,  View } from 'react-native'
import RolViewModel from './ViewModel'
import RolePoster from '../../components/RolePoster'
import LoadingIndicator from '../../components/LoadingIndicator'
import Carousel from 'react-native-reanimated-carousel'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigator/MainStackNavigator'



type Props = NativeStackScreenProps<RootStackParamList, 'RolesScreen'>;
const RolScreen = ({navigation}:Props) => {
    const { roles, width } = RolViewModel();

    if (!roles || !roles.length)
        return <LoadingIndicator />
    return (
        <View style={styles.conatiner} >
            <Carousel
                width={width}
                
                data={roles}
                renderItem={({ item }) => <RolePoster role={item} width={width} navigation={navigation} />}
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
        justifyContent: 'center',
        alignContent: 'center'
    }
});
export default RolScreen