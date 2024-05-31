"use client"
import { Input } from '@/components/ui/input'
import { postDataFD } from '@/lib/action'
import React, { useState } from 'react'

const FormComponent = () => {
    const [count, setCount] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        // console.log(formData)
        postDataFD(formData)
    }

    return (
        <>
            <form method='post' className='pb-4' onSubmit={handleSubmit}>
                <div className='md:w-1/2 w-5/6 flex justify-center items-start flex-col gap-1'>
                    <label htmlFor="text">Answer</label>
                    <Input name="message" id="text" type="text" placeholder="Message" />
                </div>
                <div className='md:w-1/2 w-full p-3 mt-5 border'>
                    {[...Array(count)].map((row) => {
                        return (
                            <div key={row}>
                                <div className='flex justify-center items-start flex-col gap-1 mt-3'>
                                    <label htmlFor="account">Name Account</label>
                                    <Input name="account" id="account" type="text" placeholder="Name Account" />
                                </div>
                                <div className='flex justify-center items-start flex-col gap-1 mt-3 border-b border-white pb-2'>
                                    <label htmlFor="cookies">Cookies</label>
                                    <Input name="cookies" id="cookies" type="file" placeholder="cookies" />
                                </div>
                            </div>
                        )
                    })}
                    <div className='flex w-full gap-2'>
                        <button className='w-full font-semibold bg-cyan-700 py-1 rounded mt-4' onClick={() => setCount(count + 1)}>Add Input Cookies</button>
                        <button className='w-full font-semibold bg-rose-700 py-1 rounded mt-4' onClick={() => setCount(count - 1)}>Remove Input Cookies</button>
                    </div>
                </div>
                <div className='md:w-1/2 w-full flex justify-center items-start flex-col mt-2'>
                    <button type='submit' className='w-full bg-blue-800 font-semibold py-1.5 rounded '>Submit</button>
                </div>
            </form>
        </>
    )
}

export default FormComponent