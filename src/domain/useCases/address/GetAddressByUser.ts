import { AddressRepositoryImpl } from "../../../data/repositories/AddressRepository";

const { getById } = new AddressRepositoryImpl()
export const GetAddressByUserUseCase = async() =>{
    return await getById()
}