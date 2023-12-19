import { AddressRepositoryImpl } from "../../../data/repositories/AddressRepository";
import { Address } from "../../entity/address";

const { create } = new AddressRepositoryImpl()
export const CreteAddressUseCase = async(address:Address) =>{
    return await create(address)
}