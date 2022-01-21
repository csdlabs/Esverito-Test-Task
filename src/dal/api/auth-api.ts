import axios from "axios";

const instance = axios.create({
    baseURL: 'https://test-backend.esverito.com',
})


export const AuthApi = {
    async login(userName: string,password: string) {
        return instance.post<LoginResponse>('/users/login', {userName, password})
    },
    async refreshToken(){
        return instance.get('/refresh')
    }
}


type LoginResponse = {
    activeTill: string
    code: number
    message: string
    token: string
    userName: string
}