import { AxiosError } from 'axios';
import { StripeRepositoryRespository } from '../../domain/repositories/StripeRepository';
import { ResponseAPIError } from '../source/remote/models/ResponseAPIError';
import { ApiDelivery } from '../source/remote/api/ApiDelivery';

export class StripeRepositoryImpl implements StripeRepositoryRespository {
    async getIntent() {
        try {
            const { data } = await ApiDelivery.post(`/api/payments/create/intents`)
            return Promise.resolve(data.data)
        } catch (error) {
            // Handle the Axios error
            const axiosError = (error as AxiosError<ResponseAPIError, any>);
            if (axiosError.response) {
                return Promise.resolve(axiosError.response.data)
            } else if (axiosError.request) {
                return Promise.resolve(axiosError.request)
            } else {
                return Promise.resolve(axiosError.message)
            }
        }
    }


}