import { useEffect, useState } from "react"
import { User } from "../../domain/entity/user"
import { GetUserCase } from "../../domain/useCases/userLocal/GetUserLocal"

export const useUserLocal = () =>{
    const [user, setUser] = useState<User>()
    useEffect(() => {
      getUserSession()
    }, [])
    const getUserSession = async() =>{
        const user = await GetUserCase()
        user && setUser(user)
    }

    return {
        user
    }
}