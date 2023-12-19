import { Asset } from "react-native-image-picker";
import { UserRepositoryImpl } from "../../../data/repositories/UserRepositoryImp";
import { User } from "../../entity/user";

const { updateWithImage } = new UserRepositoryImpl();

export const UpdateWithImageUser = async(user:Partial<User>,  file: Asset) => {
    return await updateWithImage(user, file);
}