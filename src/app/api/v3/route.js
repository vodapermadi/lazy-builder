import axios from "axios"
import { NextResponse } from "next/server"

export const GET = async(req) => {
    // try {
    //     const body = await req.formData()
    //     // console.log(body)
    //     const { data } = await axios.post(`${process.env.BACKEND_ENDPOINT}/upload_multiple`,body,{
    //         headers:{
    //             "Content-Type":"multipart/form-data"
    //         }
    //     })
    //     return NextResponse.json(data)
    // } catch (error) {
    //     return NextResponse.json(error)
    // }
    const body = await req.nextUrl.searchParams
    return NextResponse.json(body.get('handle'))
}