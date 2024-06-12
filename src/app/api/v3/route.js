import axios from "axios"
import { NextResponse } from "next/server"

let config = {
    "db": "Layanan",
    "ds": "Cluster0",
    "key": process.env.KEY,
    "url": process.env.URL_MONGO
}

export const POST = async (req) => {
    try {
        const url = await req.nextUrl.searchParams
        if (url.get('mode') === "single") {
            const { col, val } = await req.json()
            let newCFG = {
                ...config,
                col: col,
                val: val,
            }

            const address = process.env.DATABASE_ENDPOINT
            const { data } = await axios.post(`${address}/deleteOne`, newCFG)
            return NextResponse.json(data)
        } else if (url.get('mode') === "multiple"){
            const { col, val } = await req.json()
            let newCFG = {
                ...config,
                col: col,
                val: val,
            }

            const address = process.env.DATABASE_ENDPOINT
            const { data } = await axios.post(`${address}/deleteMany`, newCFG)
            return NextResponse.json(data)
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}