import { AxiosError } from "axios";
import { Category } from "../../domain/entity/category";
import { ResponseAPIError } from '../source/remote/models/ResponseAPIError';
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../source/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../source/remote/models/ResponseApiDelivery";
import { Asset } from "react-native-image-picker";
import { Platform } from "react-native";

export class CategoryRepositoryImpl implements CategoryRepository{
    async update(categodry: Category) {
        try {
            const { data } = await ApiDelivery.put<ResponseAPIDelivery>('/categories/update', categodry)
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
    async updateWithImage(category: Category, file: Asset) {
        try {
            let dataFile = new FormData()
            dataFile.append('image', {
                name: file.fileName,
                type: file.type,
                uri: Platform.OS === 'ios' ? file.uri!.replace('file://', '') : file.uri,
            })
            dataFile.append('category', JSON.stringify(category))

            const { data } = await ApiDeliveryForImage.put<ResponseAPIDelivery>('/categories/update/update-with-image', dataFile)
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
            const { data } = await ApiDeliveryForImage.delete<ResponseAPIDelivery>(`/categories/${id}`)
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
    async getAll() {
        try {
            const { data } = await ApiDeliveryForImage.get<ResponseAPIDelivery>('/categories')
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
    async register(category: Category, file:Asset) {
        try {
            let dataFile = new FormData()
            dataFile.append('image', {
                name: file.fileName,
                type: file.type,
                uri: Platform.OS === 'ios' ? file.uri!.replace('file://', '') : file.uri,
            })
            dataFile.append('category', JSON.stringify(category))

            const { data } = await ApiDeliveryForImage.post<ResponseAPIDelivery>('/categories', dataFile)
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