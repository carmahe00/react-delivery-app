import { UserRepositoryImpl } from "../../../data/repositories/UserRepositoryImp";
import { User } from "../../entity/user";

const { updateNotificationToken } = new UserRepositoryImpl();

export const UpdateNotificationTokenUseCase = async(id: string, token: string) => {
    return await updateNotificationToken(id, token);
}