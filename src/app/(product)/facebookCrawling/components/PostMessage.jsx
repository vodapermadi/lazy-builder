import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { findData } from '@/lib/action'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const PostMessage = ({ user, handleMessage,grup }) => {
    const [count, setCount] = useState(1)
    const [path, setPath] = useState([])
    const [group,setGroup] = useState([])
    const [account,setAccount] = useState([])

    useEffect(() => {
        (async () => {
            await findData('images', {
                filter: {
                    id_user: user
                }
            }).then((res) => {
                setPath(res)
            })

            await findData('resource',{
                filter:{
                    id_user:user
                }
            }).then((res) => {
                setAccount(res)
            })

            grup({id_user:user,mode:"get_grup"}).then((row) => {
                setGroup(row)
                console.log(row)
            })
        })()

    }, [])

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
                        <Textarea name="text" placeholder="text" type="text" />
                        <select name="type" className='w-full py-2 rounded p-2 text-black'>
                            <option value="">-- pilih type --</option>
                            <option value="img">Image</option>
                            <option value="text">Text</option>
                        </select>
                        <select name="grup" multiple className='w-full py-2 rounded p-2 text-black'>
                            <option value="">-- group link --</option>
                            {group !== undefined && group.length > 0 && group.map((row,i) => {
                                return(
                                    <option key={i} value={row.link}>{row.name}</option>
                                )
                            })}
                        </select>
                        <select name="cookie_path" multiple className='w-full py-2 rounded p-2 text-black'>
                            <option value="">-- account --</option>
                            {account.map((row, i) => {
                                return (
                                    <option key={i} value={row.cookie}>{row.account_link}</option>
                                )
                            })}
                        </select>
                        <select multiple name="path" className='w-full rounded p-2 text-black bg-gray-700'>
                            <option value="" className='text-white'>-- pilih gambar --</option>
                            {path?.length !== 0 ? path?.map((row) => {
                                return (
                                    <>
                                        <option key={row.path} value={row.path}>
                                            <Image src={`data:image/png;base64,${row.source}`} className='w-[200px] h-auto' width={200} height={200} alt={row.path} />
                                        </option>
                                    </>
                                )
                            }) : (
                                <option>
                                    Image not found
                                </option>
                            )}
                        </select>

                    </div>
                    <span className="py-2 px-3 font-semibold rounded bg-sky-800 hover:bg-sky-500 duration-150" onClick={() => setCount(count + 1)}>Add Form</span>
                    <span className="py-2 px-3 font-semibold rounded bg-rose-800 hover:bg-rose-500 duration-150" onClick={() => setCount(count === 0 ? 0 : count - 1)}>Remove Form</span>
                    <button type='submit' className="py-2 px-3 font-semibold rounded bg-blue-800 hover:bg-blue-500 duration-150">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PostMessage