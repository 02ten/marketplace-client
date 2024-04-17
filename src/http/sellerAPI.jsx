import {$authHost, $host} from "./index.jsx";

export const fetchMyProducts = async() =>{
    const response = await $authHost.get('/api/seller/product/')
    return response
}
export const addNewProduct = async(product) =>{
    console.log(product)
    const response = await $authHost.post('/api/seller/product/',product)
    return response
}
export const deleteProduct = async(id) =>{
    const response = await $authHost.delete('/api/seller/product/'+id)
    return response
}
export const getMyProductById = async (id) =>{
    const response = await $authHost.get('/api/seller/product'+id)
    return response
}
export const updateProduct = async (id) =>{

}
