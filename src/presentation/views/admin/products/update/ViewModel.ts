import { Asset, launchImageLibrary } from "react-native-image-picker"
import { useForm } from "../../../../hooks/useForm"
import { ToastAndroid } from "react-native"
import { useContext, useEffect, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import { ProductStackParamList } from "../../../../navigator/AdminProductNavigator"
import { ProductContext } from "../../../../context/product/ProductContext"
import { Category } from "../../../../../domain/entity/category"
import { Product } from "../../../../../domain/entity/product"
interface Props {
  category: Category
  navigation: StackNavigationProp<ProductStackParamList, "AdminProductUpdateScreen", undefined>,
  product: Product
}
const AdminProductUpdateViewMoel = ({ category, navigation, product }: Props) => {
  const [file, setFile] = useState<Asset[]>()
  const { updateWithImage, update } = useContext(ProductContext)
  const { form, onChange, isNotEmptyString,  } = useForm(product)

  useEffect(() => {
    
    if (!category.id)
      navigation.goBack()
  }, [category])


  const pickImage = async () => {
    
    let result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 3
    })

    if (result.errorCode || result.didCancel || result.errorMessage)
      return ToastAndroid.show('Gallery not aviable', ToastAndroid.BOTTOM)
    if (result.assets && result.assets.length && result.assets[0].uri) {
      setFile([])
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

  const updateProduct = () => {
    if (isNotEmptyString(form.description) || isNotEmptyString(form.name))
      return ToastAndroid.show('Fieds must be filled', ToastAndroid.BOTTOM)
    
    file ? updateWithImage(form, file) : update(form)
  }

  return {
    file,
    form,
    onChange,
    pickImage,
    updateProduct
  }
}

export default AdminProductUpdateViewMoel