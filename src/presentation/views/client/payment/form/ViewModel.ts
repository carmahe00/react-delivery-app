import React, { useEffect, useState } from 'react'
import { IdentificationType } from '../../../../../domain/entity/IdentificationType';
import { GetIdentificationTypesMercadoPagoUseCase } from '../../../../../domain/useCases/mercado_pago/GetIdentificationTypesMercadoPago';
import { useForm } from '../../../../hooks/useForm';
import { ToastAndroid } from 'react-native';
import { CreateCardTokenMercadoPagoUseCase } from '../../../../../domain/useCases/mercado_pago/CreateCardTokenMercadoPago';
import { CardTokenParams } from '../../../../../data/source/remote/models/CardTokenParams';
import { ResponseMercadoPagoCardToken } from '../../../../../data/source/remote/models/ResponseMercadoPagoCardToken';
interface DropDownProps {
    label: string, value: string
}
const ClientPaymentViewModel = () => {
    const creditCardRef = React.useRef() as any;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [cardToken, setCardToken] = useState<ResponseMercadoPagoCardToken>();
    const [items, setItems] = useState<DropDownProps[]>([]);

    const { onChange, identificationNumber } = useForm({
        identificationNumber: ''
    })

    const [identificationTypeList, setidentificationTypeList] = useState<IdentificationType[]>([])

    const getIdentificationTypes = async () => {
        const result = await GetIdentificationTypesMercadoPagoUseCase()
        setidentificationTypeList(result)
    }

    const createToken = async (data: CardTokenParams) => {

        const result = await CreateCardTokenMercadoPagoUseCase(data)
        if (result)
            if (result.id !== "")
                setCardToken(result)


        console.log(JSON.stringify(result, null, 3))
    }

    const handleSubmit = React.useCallback(async () => {
        if (creditCardRef.current) {
            let { error, data } = creditCardRef.current.submit();
            if (error !== null)
                return ToastAndroid.show('Error submit', ToastAndroid.BOTTOM);
            

            const dataSend: CardTokenParams = {
                card_number: data.number.replace(/\s/g, ""),
                expiration_year: data.expiration.split("/")[1],
                expiration_month: parseInt(data.expiration.split("/")[0]),
                security_code: data.cvv,
                cardholder: {
                    name: data.holder,
                    identification: {
                        number: identificationNumber,
                        type: value
                    }
                }
            }
            await createToken(dataSend);
        }
    }, [value, identificationNumber]);



    const setDropDownItems = () => {
        let itemsIdentification: DropDownProps[] = []
        identificationTypeList.forEach(identification => {
            itemsIdentification.push({
                label: identification.name,
                value: identification.id
            })
        })
        setItems(itemsIdentification)
    }

    useEffect(() => {
        setDropDownItems()
    }, [identificationTypeList])

    return {
        creditCardRef,
        handleSubmit,
        getIdentificationTypes,
        identificationTypeList,
        open,
        value,
        items,
        setOpen,
        setValue,
        setItems,
        onChange,
        setDropDownItems,
        cardToken
    }
}

export default ClientPaymentViewModel