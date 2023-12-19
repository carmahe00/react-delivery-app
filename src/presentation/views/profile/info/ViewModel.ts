import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext';

const ProfileViewModel = () => {
    const { signOut, state } = useContext(AuthContext);
    
    return {
        signOut,
        user: state?.user
    }
}

export default ProfileViewModel