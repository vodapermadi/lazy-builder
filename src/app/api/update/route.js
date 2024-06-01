import axios from "axios"
import { NextResponse } from "next/server"

let config = {
    "db": "Server",
    "ds": "Cluster0",
    "key": process.env.KEY,
    "url": process.env.URL_MONGO
}

export const GET = async () => {
    try {
        const ip = await axios.get('https://api.ipify.org?format=json')

        let newCFG = {
            ...config,
            col: "ip_address",
            fil: { _id: { "$oid":"6655f03ff61dc9b1417bc39f"}},
            val: { ip_address: ip?.data.ip}
        }

        const {data} = await axios.post(`${process.env.DATABASE_ENDPOINT}/updateOne`, JSON.stringify(newCFG), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        return NextResponse.json({
            data,
            ip:ip?.data.ip
        })
    } catch (error) {
        return NextResponse.json(error)
    }
}