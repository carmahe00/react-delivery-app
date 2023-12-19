import { User } from "../../domain/entity/user";
import { UserLcoalRepository } from "../../domain/repositories/UserLocalRepository";
import { localStotage } from "../source/local/LocalStorage";

export class UserLcoalRepositoryImpl implements UserLcoalRepository{
    async deleteUser(): Promise<void> {
        const { deleteItem } = localStotage()
        await deleteItem('user')
    }
    async save(user: User): Promise<void> {
        const { save } = localStotage()
        await save('user', JSON.stringify(user))
    }
    async getUser(): Promise<User | null > {
        const { getItem } = localStotage()
        let user = await getItem('user')
        if(user === null || user === undefined)
            return Promise.resolve(null)
       return Promise.resolve(JSON.parse(user))
    }

}