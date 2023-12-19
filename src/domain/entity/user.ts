import { Address } from "./address";
import { Rol } from "./rol";

export interface User {
    id?: string;
    email: string;
    name: string;
    phone: string;
    image?: string;
    lastName: string;
    session_token?: string;
    notification_token?: string;
    roles?: Rol[],
    address?: Address;
}
