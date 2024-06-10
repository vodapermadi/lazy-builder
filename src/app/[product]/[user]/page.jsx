"use client"
import ChatBot from '@/app/(product)/chatBot'
import FacebookCrawling from '@/app/(product)/facebookCrawling'
import { useEffect, useState } from 'react'

const Page = ({ params }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (typeof window !== undefined) {
            setShow(true)
        }
    }, [])

    return (
        <>
            {show && (
                <>
                    {params.product === 'chat-bot' && (
                        <ChatBot />
                    )}

                    {params.product === 'facebook-crawling' && (
                        <FacebookCrawling user={params.user} />
                    )}
                </>
            )}
        </>
    )
}

export default Page