import React, { useContext, useEffect, useState } from 'react'
import { useForm } from '../../../../hooks/useForm';
import { ResponseMercadoPagoCardToken } from '../../../../../data/source/remote/models/ResponseMercadoPagoCardToken';
import { GetInstallmentTypesMercadoPagoUseCase } from '../../../../../domain/useCases/mercado_pago/GetInstallmentTypesMercadoPago';
import { ShoppingBagContext } from '../../../../context/shopping/ShoppingProvider';
import { PayerCost, ResponseMercadoPagoInstallments } from '../../../../../data/source/remote/models/ResponseMercadoPagoInstallments';
import { CreatePaymentMercadoPagoUseCase } from '../../../../../domain/useCases/mercado_pago/CreatePaymentMercadoPago';
import { PaymentParams } from '../../../../../data/source/remote/models/PaymentParams';
import { AuthContext } from '../../../../context/AuthContext';
import { Identification } from '../../../../../data/source/remote/models/CardTokenParams';
import { ResponseMercadoPagoPayment } from '../../../../../data/source/remote/models/ResponseMercadoPagoPayment';
interface DropDownProps {
    label: string, value: string
}
const ClientPaymentViewModel = (cardToken: ResponseMercadoPagoCardToken) => {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const [paymentData, setPaymentData] = useState<ResponseMercadoPagoPayment>()
    const { state } = useContext(ShoppingBagContext)
    const [isLoading, setIsLoading] = useState(false)
    const { state: stateUser } = useContext(AuthContext)
    const [items, setItems] = useState<DropDownProps[]>([]);
    const [responseMessage, setResponseMessage] = useState("");
    const [installments, setInstallments] = useState<PayerCost[]>([])
    const [installmentData, setInstallmentData] = useState<ResponseMercadoPagoInstallments>()

    useEffect(() => {
        if (installments.length)
            setDropDownItems()
    }, [installments])

    const createPayament = async () => {
        const description = state.products.map(p => p.description).join(",")
        const data: PaymentParams = {
            description,
            installments: Number(value),
            issuer_id: installmentData?.issuer.id!,
            payment_method_id: installmentData?.payment_method_id!,
            transaction_amount: state.total,
            token: cardToken.id,
            payer: {
                last_name: stateUser?.user?.lastName!,
                name: stateUser?.user?.name!,
                email: stateUser?.user?.email!,
                identification: {
                    number: cardToken.cardholder.identification.number,
                    type: cardToken.cardholder.identification.type
                }
            },
            order: {
                idClient: stateUser?.user!,
                idAddress: stateUser?.user?.address?.id!,
                products: state.products
            }
        }
        setIsLoading(true);
        try {
            const result = await CreatePaymentMercadoPagoUseCase(data);
            setPaymentData(result.data as ResponseMercadoPagoPayment)
            setResponseMessage(result.message);
        } catch (error) {
            // Handle error if needed
        } finally {
            setIsLoading(false);
        }
    }

    const getInstallments = async () => {
        const result = await GetInstallmentTypesMercadoPagoUseCase(cardToken.first_six_digits, state.total)
        setInstallments(result.payer_costs)
        setInstallmentData(result)
    }

    const setDropDownItems = () => {
        let itemsIdentification: DropDownProps[] = []
        installments.length && installments.forEach(i => {
            itemsIdentification.push({
                label: i.recommended_message,
                value: i.installments.toString()
            })
        })

        setItems(itemsIdentification)
    }

    return {
        open,
        value,
        items,
        isLoading,
        paymentData,
        responseMessage,
        createPayament,
        setOpen,
        setValue,
        setItems,
        getInstallments
    }
}

export default ClientPaymentViewModel