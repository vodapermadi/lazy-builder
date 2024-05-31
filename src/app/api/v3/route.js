import axios from "axios"
import { NextResponse } from "next/server"

export const POST = async(req) => {
    try {
        const body = await req.formData()
        console.log(body)
        // const { data } = await axios.post(`${process.env.BACKEND_ENDPOINT}/upload_multiple`,body,{
        //     headers:{
        //         "Content-Type":"multipart/form-data"
        //     }
        // })
        return NextResponse.json(body)
    } catch (error) {
        return NextResponse.json(error)
    }
}