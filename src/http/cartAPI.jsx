import {$authHost, $host} from "./index.jsx";

export const addToCart = async(productId) =>{
    const response = await $authHost.post('/api/cart/'+productId+'?quantity=1')
    return response
}
export const fetchCart = async() =>{
    const response = await $authHost.get('/api/cart/')
    return response
}
export const deleteCart = async (id) =>{
    const response = await $authHost.delete('/api/cart/'+id)
}

