import { UserLcoalRepositoryImpl } from "../../../data/repositories/UserLocalRepositoryImpl";
const { getUser } = new UserLcoalRepositoryImpl()
export const GetUserCase =async () => {
    return await getUser()
}