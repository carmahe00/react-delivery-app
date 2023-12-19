import { User } from "../entity/user";

export interface UserLcoalRepository{
    save(user:User): Promise<void>
    getUser(): Promise<User | null >
    deleteUser(): Promise<void>
}