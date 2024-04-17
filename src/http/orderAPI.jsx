import {$authHost, $host} from "./index.jsx";

export const createOrder = async(formData) =>{
    const response = await $authHost.post('/api/order', formData)
    return response
}

