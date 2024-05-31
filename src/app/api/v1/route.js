import axios from "axios"
import { NextResponse } from "next/server"

let config = {
    "db": "Layanan",
    "ds": "Cluster0",
    "key": process.env.KEY,
    "url": process.env.URL_MONGO
}

export const POST = async (req) => {
    const { col, filter } = await req.json()

    try {
        let newCFG = {
            ...config,
            col: col,
            option: filter,
        }

        const { data } = await axios.post(`${process.env.DATABASE_ENDPOINT}/getData`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export const PATCH = async (req) => {
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