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
        let url = await req.nextUrl.searchParams

        if (url.get('mode') === "multiple") {
            const { col, val } = await req.json()

            let newCFG = {
                ...config,
                col: col,
                val: val,
            }
            const { data } = await axios.post(`${process.env.DATABASE_ENDPOINT}/insertMany`, JSON.stringify(newCFG), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return NextResponse.json(data)
        } else if (url.get('mode') === "single"){
            const { col, val } = await req.json()

            let newCFG = {
                ...config,
                col: col,
                val: val,
            }
            const { data } = await axios.post(`${process.env.DATABASE_ENDPOINT}/insertOne`, JSON.stringify(newCFG), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return NextResponse.json(data)
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}