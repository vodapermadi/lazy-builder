import axios from "axios"

export const postImage = async(val) => {
    try {
        const { data } = await axios.post('/api/v3/facebook?mode=image',val,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        
        return data
    } catch (error) {
        return error
    }
}

export const handlePost = async(val) => {
    try {
        const { data } = await axios.post('/api/v3/facebook?mode=account',val)
        return data
    } catch (error) {
        return error
    }
}
