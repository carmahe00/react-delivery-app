import { AxiosError } from "axios";
import { Order } from "../../domain/entity/order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { ApiDelivery } from "../source/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../source/remote/models/ResponseApiDelivery";
import { ResponseAPIError } from '../source/remote/models/ResponseAPIError';

export class OrderRepositoryImpl implements OrderRepository{
    async getByClientAndStatus(idClient: string, status: string){
        try {
            const { data } = await ApiDelivery.get(`/orders/find-by-client/${idClient}/${status}`)
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
    async updateToDelivered(order: Order){
        try {
            const { data } = await ApiDelivery.put(`/orders/update-to-delivered`, order)
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
    async updateToOnTheWay(order: Order) {
        try {
            const { data } = await ApiDelivery.put(`/orders/update-to-on-the-way`, order)
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
    async getByDeliveryAndStatus(idDelivery: string, status: string){
        try {
            const { data } = await ApiDelivery.get(`/orders/${idDelivery}/${status}`)
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
    async updateToDispatched(order: Order){
        try {
            const { data } = await ApiDelivery.put(`/orders/update-to-dispatched`, order)
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
    async getByStatus(status: string) {
        try {
            const { data } = await ApiDelivery.get(`/orders/${status}`)
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
    async create(order: Order) {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('/orders', order)
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