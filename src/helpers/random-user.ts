import axios from "axios"
import {User} from "../types/user.ts"
import {useProductStore} from "../store/product.ts"

export const getRandomUser = async () => {
    const store = useProductStore()
    return store.$state.users[Math.floor(Math.random() * 29)]
}

export const pushUsersInStore = async () => {
    const userResponse = await axios.get(`https://dummyjson.com/users`);
    const users: User[] = userResponse.data.users

    return users
}
