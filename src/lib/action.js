import axios from "axios"
import { getToken } from "./helper"

// check auth
export const checkAuth = async (fp, id_user, label) => {
    try {
        const token = getToken()
        const { data } = await axios.post("/api/maria", JSON.stringify({ id_user, fp, token, label }))
        return data
    } catch (error) {
        return error
    }
}

// handle mongodb
export const findData = async(col,filter) => {
    try {
        const { data } = await axios.post("/api/v1", {
            col: col,
            filter: filter
        })
        return data
    } catch (e) {
        return e
    }
}

export const insertOne = async() => {
    // 
}

export const insertMany = async() => {
    // 
}

export const updateOne = async(col,fil,val) => {
    try {
        const { data } = await axios.patch("/api/v1", {
            col: col,
            fil: fil,
            val: val
        })

        return data
    } catch (error) {
        return error
    }
}

export const updateMany = async() => {
    // 
}

export const deleteOne = async() => {
    // 
}

export const deleteMany = async() => {
    // 
}

// custom api endpoint json
export const postData = async() => {
    // 
}

export const getData = async() => {
    // 
}

// custom api endpoint formData
export const postDataFD = async(val) => {
    try {
        const {data} = await axios.post('/api/v3',val,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        return data
    } catch (error) {
        return error
    }
}