import axios from "axios"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        let url = await req.nextUrl.searchParams
        if (url.get('mode') === "image") {
            const body = await req.formData()
            const { data } = await axios.post('https://b04f-103-174-115-93.ngrok-free.app/API/upload', body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return NextResponse.json(data)
        } else if (url.get('mode') === "account" || url.get('mode') === "message") {
            const body = await req.json()
            const { data } = await axios.post('https://b04f-103-174-115-93.ngrok-free.app/API/post', body)
            return NextResponse.json(data)
        } else {
            return NextResponse.json({
                message: "error"
            }, 404)
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}