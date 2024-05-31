import axios from "axios"
import { NextResponse } from "next/server"

const midmongo = "https://vodapermadi-vodapermadi-b786f8e8.koyeb.app/mongodb"
const key = "M2rYHrEXB6LsgZvSCoSMEfWb1riaEQwkM0CXCLZ1jm2z66v5YbDhuwxE4wGVkufq"
const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-patwzta/endpoint/data/v1/action"

const config = {
    "db": "Layanan",
    "ds": "Cluster0",
    "key": key,
    "url": url
}

export const GET = async (req) => {
    const body = await req
    const id = body.nextUrl.searchParams.get("id")
    const product = body.nextUrl.searchParams.get("pd")
    
    try {
        const val = {
            ...config,
            col: "Pengguna",
            option: {
                filter: {
                    _id: {
                        "$oid": id
                    }
                }
            }
        }

        const { data } = await axios.post(`${midmongo}/getData`, JSON.stringify(val), {
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (data.length > 0) {
            return NextResponse.json({ 
                id: data[0].id_user,
                product:product
            })
        }else{
            return NextResponse.json({
                message:"not found",
                status:404
            })
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}