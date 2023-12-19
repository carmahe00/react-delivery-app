import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Dimensions } from 'react-native';
const RolViewModel = () => {
    const { state } = useContext(AuthContext);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return {
        roles: state?.user?.roles,
        loading: state?.isLoading,
        width,
        height
    }
}

export default RolViewModel