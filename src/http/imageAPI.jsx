import {$host} from "./index.jsx";

export const fetchImage = async(imageId) =>{
    const response = await $host.get('/api/image/'+imageId)
    return response
}

