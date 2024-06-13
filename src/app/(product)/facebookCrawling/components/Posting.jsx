import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteOne, findData } from '@/lib/action'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Posting = ({user}) => {
    const router = useRouter()
    const [postingan,setPostingan] = useState([])

    useEffect(() => {
        findData('postingan',{filter:{id_user : user}}).then((res) => {
            setPostingan(res)
        })
    },[])

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Publiser</TableHead>
                        <TableHead>Keyword</TableHead>
                        <TableHead>Create</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {postingan.map((row, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>
                                    {row.publisher.map((child, j) => {
                                        let label = ['Nickname', 'Group']
                                        return (
                                            <p key={j}>
                                                {label[j]} : {child}
                                            </p>
                                        )
                                    })}
                                </TableCell>
                                <TableCell>
                                    <ul className='list-disc list-outside'>
                                        {row.deteksi.split(',').map((list) => {
                                            return (
                                                <li>{list}</li>
                                            )
                                        })}
                                    </ul>
                                </TableCell>
                                <TableCell>{row.publish_date}</TableCell>
                                <TableCell className="flex justify-center items-center gap-3">
                                    {/* modal */}
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <button className='py-1 px-2 bg-cyan-800 rounded text-sm font-semibold hover:bg-cyan-700 duration-150'>View</button>
                                        </DrawerTrigger>
                                        <DrawerContent className="w-full flex justify-center items-center">
                                            <div className='h-[80vh] w-5/6'>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Publiser</TableHead>
                                                            <TableHead>Keyword</TableHead>
                                                            <TableHead>Text</TableHead>
                                                            <TableHead>Like</TableHead>
                                                            <TableHead>Komentar</TableHead>
                                                            <TableHead>Create</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>
                                                                {row.publisher.map((child, j) => {
                                                                    let label = ['Nickname', 'Group']
                                                                    return (
                                                                        <p key={j}>
                                                                            {label[j]} : {child}
                                                                        </p>
                                                                    )
                                                                })}
                                                            </TableCell>
                                                            <TableCell>
                                                                <ul className='list-disc list-outside'>
                                                                    {row.deteksi.split(',').map((list) => {
                                                                        return(
                                                                            <li>{list}</li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </TableCell>
                                                            <TableCell>
                                                                
                                                            </TableCell>
                                                            {row.data.map((child, j) => {
                                                                return (
                                                                    <TableCell key={j}>
                                                                        {child.replace("Komentar", "")}
                                                                    </TableCell>
                                                                )
                                                            })}
                                                            <TableCell>{row.publish_date}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                                <button className='px-2 py-1 mt-2 bg-blue-800 hover:bg-blue-700 duration-200 rounded font-semibold text-sm' onClick={() => router.push(row.link_post)}>Go to Postingan</button>
                                            </div>
                                            {/* content */}
                                        </DrawerContent>
                                    </Drawer>
                                    {/* end modal */}
                                    <button className='py-1 px-2 bg-rose-800 rounded text-sm font-semibold hover:bg-rose-700 duration-150' onClick={() => {
                                        deleteOne('postingan',{
                                            _id:{
                                                "$oid":row._id
                                            }
                                        }).then((res) => {
                                            window.alert('delete success')
                                            setTimeout(() => {
                                                window.location.reload()
                                            },400)
                                        })
                                    }}>Delete</button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export default Posting