
import { UserRepositoryImpl } from '../../../data/repositories/UserRepositoryImp'
const { getDelivery} = new UserRepositoryImpl()
const GetDeleveryMenuUserUseCase = async() => {
  return await getDelivery()
}

export default GetDeleveryMenuUserUseCase