import { useForm } from "../../../../hooks/useForm"
import { useContext, useEffect } from "react"
import { PlacesContext } from "../../../../context/place/PlaceContext"
import { AuthContext } from "../../../../context/AuthContext";
import { ToastAndroid } from "react-native";

const ClientAddressCreateViewMoel = () => {
  const { currentPosition, create:createUsecase } = useContext(PlacesContext);
  const { state } = useContext(AuthContext)

  const { form, onChange, isNotEmptyString } = useForm({
    address: '',
    neighborhood: '',
    refPoint: '',
    lat: 0,
    lng: 0,
    userId: ''
  })

  useEffect(() => {

    if (currentPosition)
      onChange(currentPosition.refPoint, "refPoint");


  }, [currentPosition])

  useEffect(() => {
    if (state?.user?.id)
      onChange(state.user?.id, 'userId');
  }, [state])



  const create = () => {
    if (!currentPosition)
      return ToastAndroid.show('Location is bad', ToastAndroid.BOTTOM)
    form.lat = currentPosition.latitude
    form.lng = currentPosition.longitude
    if (isNotEmptyString(form.address) || isNotEmptyString(form.neighborhood) || isNotEmptyString(form.refPoint))
      return ToastAndroid.show('Fields must be filled', ToastAndroid.BOTTOM)
      createUsecase(form)
  }

  return {
    form,
    onChange,
    create
  }
}

export default ClientAddressCreateViewMoel