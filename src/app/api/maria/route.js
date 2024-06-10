import axios from "axios"
import { NextResponse } from "next/server"

// check user
export const POST = async (req) => {
    try {
        const { id_user, fp, token, label } = await req.json()
        const { data } = await axios.post(process.env.AUTH_ENDPOINT, JSON.stringify({
            id_user: id_user,
            fp: fp,
            service: label
        }), {
            headers: {
                "token": token,
                "Content-Type": "application/json"
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export const GET = async() => {
    try {
        const { data } = await axios.get('https://api.ipify.org/?format=json')
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}
