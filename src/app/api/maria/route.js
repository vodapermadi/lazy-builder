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

let config = {
    "db": "Server",
    "ds": "Cluster0",
    "key": process.env.KEY,
    "url": process.env.URL_MONGO
}

export const PATCH = async() => {
    const { col, fil, val } = await req.json()
    try {
        let newCFG = {
            ...config,
            col: col,
            fil: fil,
            val: val
        }
        const { data } = await axios.post(`${process.env.DATABASE_ENDPOINT}/updateOne`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}