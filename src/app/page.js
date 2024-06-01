"use client"
import axios from 'axios'
import { notFound, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function CheckUser() {
    const router = useRouter()
    
    useEffect(() => {
        if(typeof window !== undefined){
            const paramUrl = new URLSearchParams(window.location.search)
            if (paramUrl.get('pd') !== null && paramUrl.get('id') !== null) {
                if (typeof window !== undefined) {
                    (async () => {
                        await axios.get('/api/update')
                        await axios.get(`/api?pd=${paramUrl.get('pd')}&id=${paramUrl.get('id')}`).then(async (res) => {
                            if(res?.data.status === 404){
                                return false
                            }else{
                                router.push(`/${res?.data.product}/${res?.data.id}`)
                            }
                        })
                    })()
                }
            } else {
                notFound()
            }
        }
    })
    return (
        <>
            Not Found
        </>
    );
}
