import {$host} from "./index.jsx";

export const fetchCategories = async() =>{
    const response = await $host.get('/api/category')
    return response
}
export const fetchProductsByCategoryId = async(id) =>{
    const response = await $host.get('/api/product/category/'+id)
    return response
}
export const fetchImagesByCategoryId = async(id) =>{
    const response = await $host.get('/api/product/image/'+id)
    return response
}