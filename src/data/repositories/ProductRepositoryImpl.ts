import { Asset } from "react-native-image-picker";
import { Product } from "../../domain/entity/product";
import { ProductRepository } from "../../domain/repositories/ProductReporistory";
import { ResponseAPIDelivery } from "../source/remote/models/ResponseApiDelivery";
import { AxiosError } from "axios";
import { ResponseAPIError } from '../source/remote/models/ResponseAPIError';
import { ApiDelivery, ApiDeliveryForImage } from "../source/remote/api/ApiDelivery";
import { Platform } from "react-native";

export class ProductRepositoryImpl implements ProductRepository{
    async update(product: Product) {
        try {
            const {data} = await ApiDelivery.put<ResponseAPIDelivery>('/products', product)
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
    async updateWithImage(product: Product, file: Asset[]) {
        try {
            let dataFile = new FormData()
            file.forEach(file =>{

                dataFile.append('image', {
                    name: file.fileName,
                    type: file.type,
                    uri: Platform.OS === 'ios' ? file.uri!.replace('file://', '') : file.uri,
                })
            })

            dataFile.append('product', JSON.stringify(product))

            const { data } = await ApiDeliveryForImage.put<ResponseAPIDelivery>('/products/update-with-image', dataFile)
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
    async remove(id: string) {
        try {
            const { data } = await ApiDeliveryForImage.delete<ResponseAPIDelivery>(`/products/${id}`)
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
    async getProductsByCategory(id:string){
        try {
            const { data } = await ApiDeliveryForImage.get<ResponseAPIDelivery>(`/products/findByCategory/${id}`)
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
    async create(product: Product, file: Asset[]) {
        try {
            let dataFile = new FormData()
            file.forEach(file =>{

                dataFile.append('image', {
                    name: file.fileName,
                    type: file.type,
                    uri: Platform.OS === 'ios' ? file.uri!.replace('file://', '') : file.uri,
                })
            })

            dataFile.append('product', JSON.stringify(product))

            const { data } = await ApiDeliveryForImage.post<ResponseAPIDelivery>('/products', dataFile)
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