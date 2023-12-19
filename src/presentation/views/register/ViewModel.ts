import { useState } from 'react';
import { ToastAndroid } from "react-native"
import { useForm } from '../../hooks/useForm';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { launchImageLibrary, Asset, launchCamera } from 'react-native-image-picker';
const RegisterViewModel = () => {
  const { signUp, signUpWithImage, state } = useContext(AuthContext);
  const [file, setFile] = useState<Asset>()
  const { form, onChange, compareFieldsEquals, isNotEmptyString } = useForm({
    email: '',
    password: '',
    lastName: '',
    confirmPassword: '',
    phone: '',
    image: '',
    name: ''
  })

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
      return ToastAndroid.show('Camera not aviable', ToastAndroid.BOTTOM)
    }
    if (result.assets && result.assets.length && result.assets[0].uri) {
      onChange(result.assets[0].uri, 'image')
      setFile(result.assets[0])
    }
  }

  const register = async () => {

    if (isNotEmptyString(form.email) ||
      isNotEmptyString(form.password) ||
      isNotEmptyString(form.phone) ||
      isNotEmptyString(form.confirmPassword) ||
      isNotEmptyString(form.name))
      return ToastAndroid.show('Fields must be filled', ToastAndroid.BOTTOM)

    if (!compareFieldsEquals("confirmPassword", 'password'))
      return ToastAndroid.show('Password must be equals', ToastAndroid.BOTTOM)
    isNotEmptyString(form.image) ? signUp(form) : signUpWithImage(form, file!)
  }

  return {
    register,
    onChange,
    pickImage,
    takePhoto,
    form,
    user: state?.user,
  }
}

export default RegisterViewModel