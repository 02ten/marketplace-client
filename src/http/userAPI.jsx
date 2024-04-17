import {$host} from "./index.jsx";
import {jwtDecode} from "jwt-decode";

export const auth = async(login, password) =>{
    const {data} = await $host.post('/api/auth/login', {login, password})
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    console.log(data)
    return jwtDecode(data.accessToken)
}
export const registration = async (firstName, lastName, login, password) => {
    const response = await $host.post('/api/auth/register', {firstName,lastName, login, password})
    return response
}
export const getAccessToken = async (refreshToken) => {
    const response = await $host.post('/api/auth/token', {refreshToken})
    console.log(response)
    return response
}