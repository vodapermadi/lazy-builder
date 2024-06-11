"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { findData } from '@/lib/action'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const GaleriComponents = ({ user, handleGaleri,loading }) => {
    const [image, setImage] = useState([])

    useEffect(() => {
        (async() => {
            findData('images', { filter: { id_user: user } }).then((res) => {
                setImage(res)
            })
        })()
    }, [])
    return (
        <>
            <div className='w-full'>
                <Dialog>
                    <DialogTrigger asChild>
                        <button className='w-full bg-blue-900 hover:bg-blue-700 duration-150 py-1 rounded font-semibold'>Add Images</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Images</DialogTitle>
                        </DialogHeader>
                        <form action="" method="post" onSubmit={handleGaleri}>
                            <input type='file' name='img' className='' required accept='image/png' />
                            <button className='w-full text-center py-1 mt-5 bg-blue-700 hover:bg-blue-500 duration-150 rounded font-semibold'>Submit</button>
                        </form>
                    </DialogContent>
                </Dialog>
                <div className='w-full grid grid-cols-3 mt-5 gap-2'>
                    {image?.length === 0 ? (
                        <div className='w-full text-center mt-5 font-semibold'>Images not found</div>
                    ) : image?.map((row, i) => {
                        return (
                            <Image key={i} src={`data:image/png;base64,${row.source}`} alt={`images ${i}`} width={500} height={500} className='w-full h-auto object-cover' />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default GaleriComponents