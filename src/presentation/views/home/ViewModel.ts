import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { useForm } from '../../hooks/useForm';

import { ToastAndroid, useColorScheme } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';
import { useContext } from 'react';
import { RootStackParamList } from '../../navigator/MainStackNavigator';
const HomeViewModel = () => {
    const { signIn, state } = useContext(AuthContext);
    const { form, onChange, isNotEmptyString } = useForm({
        email: '',
        password: ''
    })
    const isDarkMode = useColorScheme() === 'dark';

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const navigationRegister = () => navigation.replace('RegisterScreen');
    const login = async () => {

        if (isNotEmptyString(form.email) ||
            isNotEmptyString(form.password))
            return ToastAndroid.show('Fields must be filled', ToastAndroid.BOTTOM)
        signIn(form.email, form.password)
    }

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return {
        user: state?.user,
        onChange,
        login,
        navigationRegister,
        isDarkMode,
        backgroundStyle
    }
}

export default HomeViewModel