import { AxiosError } from "axios";
import { Address } from "../../domain/entity/address";
import { AddressRepository } from "../../domain/repositories/AddressRepository";
import { ResponseAPIDelivery } from "../source/remote/models/ResponseApiDelivery";
import { ResponseAPIError } from '../source/remote/models/ResponseAPIError';
import { ApiDelivery } from "../source/remote/api/ApiDelivery";

export class AddressRepositoryImpl implements AddressRepository {
    async getById() {
        try {
            const { data } = await ApiDelivery.get<ResponseAPIDelivery>('/address')
            return Promise.resolve(data)
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
    async create(address: Address) {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('/address', address)
            return Promise.resolve(data)
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