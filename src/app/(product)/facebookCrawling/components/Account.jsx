"use client"

import { Input } from "@/components/ui/input"
import { useState } from "react"

const AccountComponents = ({ handleForm, user }) => {
    const [count, setCount] = useState(1)
    return (

        <form method="post" className="w-full" onSubmit={handleForm}>
            {[...Array(count < 0 ? 0 : count).keys()].map((row) => {
                return (
                    <div key={row} className="w-full border border-gray-400 p-3 flex flex-col justify-center items-center gap-3 mt-2">
                        <Input name="cookie" placeholder="cookie" className="border border-gray-400" />
                        <Input name="account_link" placeholder="account link" className="border border-gray-400" />
                        <Input name="ua" placeholder="user agent" className="border border-gray-400" />
                        <Input name="grup_join" placeholder="group join" className="border border-gray-400" />
                    </div>
                )
            })}
            <div className="w-full text-center mt-3 space-x-2">
                <span className="py-2 px-3 font-semibold rounded bg-sky-800 hover:bg-sky-500 duration-150" onClick={() => setCount(count + 1)}>Add Form</span>
                <span className="py-2 px-3 font-semibold rounded bg-rose-800 hover:bg-rose-500 duration-150" onClick={() => setCount(count === 0 ? 0 : count - 1)}>Remove Form</span>
                <button type="submit" className="py-2 px-3 font-semibold rounded bg-blue-800 hover:bg-blue-500 duration-150">Submit</button>
            </div>
        </form>
    )
}

export default AccountComponents