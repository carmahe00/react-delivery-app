import { AxiosError } from "axios";
import { User } from "../../domain/entity/user";
import { AuthRepository } from "../../domain/repositories/AuthRepository";
import { ApiDelivery, ApiDeliveryForImage } from "../source/remote/api/ApiDelivery";
import { ResponseAPIDelivery } from "../source/remote/models/ResponseApiDelivery";
import { ResponseAPIError } from '../source/remote/models/ResponseAPIError';
import { Asset } from "react-native-image-picker";
import { Platform } from "react-native";

export class AuthRepositoryImpl implements AuthRepository {
    async registerWithImage(user: User, file: Asset) {
        try {
            let dataFile = new FormData()
            dataFile.append('image', {
                name: file.fileName,
                type: file.type,
                uri: Platform.OS === 'ios' ? file.uri!.replace('file://', '') : file.uri,
            })
            dataFile.append('user', JSON.stringify(user))

            const { data } = await ApiDeliveryForImage.post<ResponseAPIDelivery>('/user/register-with-image', dataFile)
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
    async login(email: string, password: string) {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('/user/login', { email, password })
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

    async register(user: User) {
        try {
            const { data } = await ApiDelivery.post<ResponseAPIDelivery>('/user', user)
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