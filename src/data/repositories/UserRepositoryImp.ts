import { Asset } from "react-native-image-picker";
import { User } from "../../domain/entity/user";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { ResponseAPIDelivery } from "../source/remote/models/ResponseApiDelivery";
import { Platform } from "react-native";
import { ApiDelivery, ApiDeliveryForImage } from '../source/remote/api/ApiDelivery';
import { AxiosError } from "axios";
import { ResponseAPIError } from '../source/remote/models/ResponseAPIError';

export class UserRepositoryImpl implements UserRepository {
    async updateNotificationToken(id: string, token: string) {
        try {
            const { data } = await ApiDelivery.put<ResponseAPIDelivery>('/user/update/update-notification-token', {
                id, token
            })
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
    async getDelivery(): Promise<User[]> {
        try {
            const { data } = await ApiDelivery.get<User[]>('/user/findDelivery')
            return Promise.resolve(data)
        } catch (error) {
            // Handle the Axios error
            const axiosError = (error as AxiosError<ResponseAPIError, any>);
            if (axiosError.response) {
                return Promise.resolve([])
            } else if (axiosError.request) {
                return Promise.resolve([])
            } else {
                return Promise.resolve([])
            }
        }
    }
    async update(user: Partial<User>) {
        try {
            const { data } = await ApiDelivery.put<ResponseAPIDelivery>('/user/update', user)
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
    async updateWithImage(user: Partial<User>, file: Asset) {
        try {
            let dataFile = new FormData()
            dataFile.append('image', {
                name: file.fileName,
                type: file.type,
                uri: Platform.OS === 'ios' ? file.uri!.replace('file://', '') : file.uri,
            })
            dataFile.append('user', JSON.stringify(user))

            const { data } = await ApiDeliveryForImage.put<ResponseAPIDelivery>('/user/update/update-with-image', dataFile)
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