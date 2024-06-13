import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { handlePost } from '../server/action'
import { findData, updateOne } from '@/lib/action'

const FormPosting = ({user}) => {
    const [group,setGroup] = useState([])

    useEffect(() => {
        handlePost({
            mode:"get_grup",
            id_user:user
        }).then((res) => {
            setGroup(res)
        })
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const keyword = formData.get('keyword').replace(" ", "").split(',')
        const metode = "regex"
        const group = formData.getAll("group[]")
        const notif = formData.get('notif')
        const generate = formData.get('generate')

        const val = {
            label: "facebook crawling",
            keyword: keyword,
            metode: {
                nama: metode,
                min: generate
            },
            grup: group,
            reaction:formData.get('reaction'),
            komentar:formData.get('comment'),
            notif: notif === "on" ? true : false
        }

        await findData('Pengguna', { filter: { id_user: user } }).then(async(usr) => {
            await updateOne('Pengguna', { id_user: user }, {
                update_at: {
                    "$timestamp": {
                        t: Math.floor(Date.now() / 1000),
                        i: 1
                    }
                },
                service: {
                    ...usr[0].service,
                    get_post: val
                }
            }).then((res) => {
                setTimeout(() => {
                    window.location.reload()
                }, 800)
            })
        })
    }

    return (
        <>
            <form method='post' className='sm:w-1/2 w-full mt-4 flex justify-center items-start flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="keyword">Keyword</label>
                    <Input type="text" required name="keyword" id="keyword" placeholder="input your keyword" />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="generate">Generate</label>
                    <Input type="number" min={0} required name="generate" id="generate" placeholder="how much for generate?" />
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <span>Choose Group</span>
                    {group.length > 0 ? group.map((row) => {
                        return (
                            <>
                                {row.map((child, i) => {
                                    return (
                                        <>
                                            <div className='w-full flex items-center gap-2' key={i}>
                                                <Checkbox name="group[]" value={child.link} id={child.nama} />
                                                <label htmlFor={child.nama}>{child.nama}</label>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        )
                    }):(
                        <span>Dont join group anywhere</span>
                    )}
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="comment">Comment</label>
                    <Input type="text" required name="comment" id="comment" placeholder="input your comment" />
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="reaction">Reaction</label>
                    <Select name='reaction' id="reaction" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="reaction?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Reaction</SelectLabel>
                                <SelectItem value="like">Like</SelectItem>
                                <SelectItem value="super">Super</SelectItem>
                                <SelectItem value="peduli">Peduli</SelectItem>
                                <SelectItem value="haha">Haha</SelectItem>
                                <SelectItem value="wow">Wow</SelectItem>
                                <SelectItem value="sedih">Sedih</SelectItem>
                                <SelectItem value="marah">Marah</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="notif">Enable Notif</label>
                    <Select name='notif' id="notif" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Enable Notif?" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Notif</SelectLabel>
                                <SelectItem value="on">On</SelectItem>
                                <SelectItem value="off">Off</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className='w-full sm:w-1/2'>
                    <button type='submit' className='py-1 px-3 bg-cyan-800 hover:bg-cyan-700 duration-150 font-semibold rounded'>Submit</button>
                </div>
            </form>
        </>
    )
}

export default FormPosting