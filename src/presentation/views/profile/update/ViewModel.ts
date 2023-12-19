import { useEffect, useState } from 'react';
import { ToastAndroid } from "react-native"
import { useContext } from "react";
import { launchImageLibrary, Asset, launchCamera } from 'react-native-image-picker';
import { AuthContext } from '../../../context/AuthContext';
import { useForm } from '../../../hooks/useForm';
import { UpdateContext } from '../../../context/update/UpdateContext';
const ProfileUpdateViewModel = () => {
  const { update, updateWithImage, state:stateUpdate } = useContext(UpdateContext)
  const { state } = useContext(AuthContext);
  const [file, setFile] = useState<Asset>()
  const { form, onChange, onChangeAllFields, isNotEmptyString } = useForm({
    lastName: state?.user?.lastName || '',
    
    phone: state?.user?.phone || '',
    image: state?.user?.image || '',
    name: state?.user?.name || ''
  })

  useEffect(() => {
    if(state?.user) 
      onChangeAllFields(state.user)
  }, [state])

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1
    })
    if (result.errorCode || result.didCancel || result.errorMessage)
      return ToastAndroid.show('Camera not aviable', ToastAndroid.BOTTOM)
    if (result.assets && result.assets.length && result.assets[0].uri) {
      onChange(result.assets[0].uri, 'image')
      setFile(result.assets[0])
    }
  }

  const takePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    })
    if (result.errorCode || result.didCancel || result.errorMessage) {
      console.log(`${result.errorCode || result.didCancel || result.errorMessage}`)
      return ToastAndroid.show('Camera not aviable', ToastAndroid.BOTTOM)
    }
    if (result.assets && result.assets.length && result.assets[0].uri) {
      onChange(result.assets[0].uri, 'image')
      setFile(result.assets[0])
    }
  }

  const updateUser = async () => {
    if (isNotEmptyString(form.lastName) ||
      isNotEmptyString(form.phone) ||
      isNotEmptyString(form.name))
      return ToastAndroid.show('Fields must be filled', ToastAndroid.BOTTOM)
      !file ? update(form) : updateWithImage(form, file)
      ToastAndroid.show('Updated profile', ToastAndroid.BOTTOM)
  }

  return {
    updateUser,
    onChange,
    pickImage,
    takePhoto,
    stateUpdate,
    form,
    user: state?.user,
  }
}

export default ProfileUpdateViewModel