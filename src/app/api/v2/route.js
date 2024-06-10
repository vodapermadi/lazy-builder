import axios from "axios"
import { NextResponse } from "next/server"

let config = {
    "db": "Layanan",
    "ds": "Cluster0",
    "key": process.env.KEY,
    "url": process.env.URL_MONGO
}

export const POST = async(req) => {
    try {
        const {col,val} = await req.json()

        let newCFG = {
            ...config,
            col: col,
            val: val,
        }

        const { data } = await axios.post(`${process.env.DATABASE_ENDPOINT}/insertOne`,JSON.stringify(newCFG),{
            headers: {
                "Content-Type": "application/json"
            }
        })
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}