"use client"
import ChatBot from '@/app/(product)/chatBot'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

const Page = ({params}) => {
    const param = useSearchParams()
    
    return (
        <Suspense>
            {params.product === 'chat-bot' && (
                <ChatBot/>
            )}
        </Suspense>
    )
}

export default Page