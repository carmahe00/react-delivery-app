import { Asset, launchImageLibrary } from "react-native-image-picker"
import { useForm } from "../../../../hooks/useForm"
import { ToastAndroid } from "react-native"
import { useContext, useEffect, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator"
import { ProductContext } from "../../../../context/product/ProductContext"
interface Props {
  id?: string
  navigation: StackNavigationProp<ProductStackParamList, "AdminProductCreateScreen", undefined>
}
const AdminProductCreateViewMoel = ({ id, navigation }: Props) => {
  const [file, setFile] = useState<Asset[]>()
  const { createProduct } = useContext(ProductContext)
  const { form, onChange, isNotEmptyString, resetForm } = useForm({
    name: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    price: 0,
    idCategory: id
  })

  useEffect(() => {
    if (!id)
      navigation.goBack()
  }, [id])


  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 3
    })

    if (result.errorCode || result.didCancel || result.errorMessage)
      return ToastAndroid.show('Gallery not aviable', ToastAndroid.BOTTOM)
    if (result.assets && result.assets.length && result.assets[0].uri) {

      result.assets.forEach((file, index) => {
        if (file.uri && file.uri !== undefined)
          switch (index) {
            case 0:
              onChange(file.uri, 'image1')
              break;
            case 1:
              onChange(file.uri, 'image2')
            case 2:
              onChange(file.uri, 'image3')
            default:
              break;
          }
      })
      setFile(result.assets.slice(0, 3))
    }
  }

  const create = () => {
    if (isNotEmptyString(form.description) || !file || isNotEmptyString(form.name))
      return ToastAndroid.show('Fieds must be filled', ToastAndroid.BOTTOM)
    createProduct(form, file);
  }

  return {
    file,
    form,
    onChange,
    pickImage,
    create
  }
}

export default AdminProductCreateViewMoel