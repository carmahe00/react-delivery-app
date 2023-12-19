import { Asset, launchImageLibrary } from "react-native-image-picker"
import { useForm } from "../../../../hooks/useForm"
import { ToastAndroid } from "react-native"
import { useContext, useState } from "react"
import { CategoryContext } from "../../../../context/category/CategoryProvider"

const AdminCategoryCreateViewMoel = () => {
  const [file, setFile] = useState<Asset>()
  const { createCategory } = useContext(CategoryContext)
  const { form, onChange, isNotEmptyString, resetForm } = useForm({
    name: '',
    image: '',
    description: ''
  })

  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1
    })
    if (result.errorCode || result.didCancel || result.errorMessage)
      return ToastAndroid.show('Gallery not aviable', ToastAndroid.BOTTOM)
    if (result.assets && result.assets.length && result.assets[0].uri) {
      onChange(result.assets[0].uri, 'image')
      setFile(result.assets[0])
    }
  }

  const create = () => {
    if (isNotEmptyString(form.description) || !file || isNotEmptyString(form.name))
      return ToastAndroid.show('Fieds must be filled', ToastAndroid.BOTTOM)
    file ? createCategory(form, file)
      : ToastAndroid.show('Gallery not aviable', ToastAndroid.BOTTOM);
    resetForm()
  }

  return {
    form,
    onChange,
    pickImage,
    create
  }
}

export default AdminCategoryCreateViewMoel