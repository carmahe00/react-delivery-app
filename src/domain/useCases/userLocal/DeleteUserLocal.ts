import { UserLcoalRepositoryImpl } from "../../../data/repositories/UserLocalRepositoryImpl";
const { deleteUser } = new UserLcoalRepositoryImpl()
export const DeleteUserCase =async () => {
    return await deleteUser()
}