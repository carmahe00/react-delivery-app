import { Asset, launchImageLibrary } from "react-native-image-picker"
import { useForm } from "../../../../hooks/useForm"
import { ToastAndroid } from "react-native"
import { useContext, useState } from "react"
import { CategoryContext } from "../../../../context/category/CategoryProvider"
import { Category } from "../../../../../domain/entity/category"

const AdminCategoryUpdateViewMoel = (category: Category) => {

  const [file, setFile] = useState<Asset>()
  const { update, updateWithImage } = useContext(CategoryContext)
  const { form, onChange, isNotEmptyString, resetForm } = useForm(category)

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

  const sendUpdate = async () => {

    if (isNotEmptyString(form.description) || isNotEmptyString(form.name))
      return ToastAndroid.show('Fieds must be filled', ToastAndroid.BOTTOM)
    file ? updateWithImage(form, file)
      : update(form)
    resetForm()
  }

  return {
    form,
    onChange,
    pickImage,
    sendUpdate
  }
}

export default AdminCategoryUpdateViewMoel