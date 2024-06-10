import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { findData } from '@/lib/action'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const PostMessage = ({ user, handleMessage }) => {
    const [count, setCount] = useState(1)
    const [path, setPath] = useState([])

    useEffect(() => {
        findData('images', {
            filter: {
                id_user: user
            }
        }).then(async(res) => {
            setPath(await res)
        })
    },[])

    return (
        <>
            <div className='w-full'>
                <form method='post' className='space-x-3' onSubmit={handleMessage}>
                    <div className='mb-3 flex flex-col w-full gap-2 justify-center items-center'>
                        <Select name='metode'>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a methode upload" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Methode</SelectLabel>
                                    <SelectItem value="grup">Group</SelectItem>
                                    <SelectItem value="wall">Beranda</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Input name="post_at" placeholder="Post At" type="time" />
                        <Input name="text" placeholder="text" type="text" />
                        <Select name='type'>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a type data" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Type</SelectLabel>
                                    <SelectItem value="img">Image</SelectItem>
                                    <SelectItem value="text">Text</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select name='path'>
                            <SelectTrigger className="w-full h-[200px]">
                                <SelectValue placeholder="Select a images" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>image</SelectLabel>
                                    {path?.length !== 0 ? path?.map((row) => {
                                        return (
                                            <>
                                                <SelectItem key={row._id} value={row.path}>
                                                    <Image src={`data:image/png;base64,${row.source}`} width={200} height={200} alt={row.path} />
                                                </SelectItem>
                                            </>
                                        )
                                    }):(
                                        <SelectItem>
                                            <span>Image not found</span>
                                        </SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* {[...Array(count).keys()].map((row) => {
                        return(
                        )
                    })} */}
                    <span className="py-2 px-3 font-semibold rounded bg-sky-800 hover:bg-sky-500 duration-150" onClick={() => setCount(count + 1)}>Add Form</span>
                    <span className="py-2 px-3 font-semibold rounded bg-rose-800 hover:bg-rose-500 duration-150" onClick={() => setCount(count === 0 ? 0 : count - 1)}>Remove Form</span>
                    <button type='submit' className="py-2 px-3 font-semibold rounded bg-blue-800 hover:bg-blue-500 duration-150">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PostMessage