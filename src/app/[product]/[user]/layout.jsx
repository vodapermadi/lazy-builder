"use client"
import SideBar from '@/components/custom/SideBar'
import { checkAuth, findData, updateOne } from '@/lib/action'
import { getFP } from '@/lib/helper'
import React, { useEffect, useState } from 'react'

const LayoutMain = ({ children, params }) => {
    const [message, setMessage] = useState("")
    const [isLogin, setIsLogin] = useState(false)

    const checkUser = () => {
        try {
            // get user
            findData('Pengguna', { filter: { id_user: params.user } }).then(async (user) => {

                setMessage("Check User")

                // check user after click login in telegram
                if (user[0]?.status && user[0].fp === "") {
                    setMessage("wait a moment")
                    // check product
                    if (params.product === "chat-bot") {
                        await updateOne('Pengguna', { id_user: params.user }, {
                            fp: String(getFP()),
                            status: true,
                            service: {
                                ...user[0].service,
                                chat_bot: {
                                    label: "Chat BOT",
                                    plan: "free",
                                    notif: true
                                }
                            }
                        }).then(() => {
                            window.location.reload()
                        })
                    } else {
                        console.log("layanan tidak tersedia")
                    }

                    // check user if found fp
                } else if (user[0].status && user[0].fp !== "") {
                    setMessage("wait a moment")
                    await checkAuth(String(getFP()), params.user, String(user[0]?.service.chat_bot.label)).then((res) => {
                        if (res?.auth && res?.status) {
                            setMessage("redirect to home")
                            setIsLogin(true)
                        }
                    })

                    // after user logout
                } else if (user[0].status === false && user[0].fp === "") {
                    setMessage("update user")
                    await updateOne('Pengguna', { id_user: params.user }, {
                        fp: String(getFP()),
                        status: true,
                    }).then(() => {
                        window.location.reload()
                    })
                }

            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkUser()
    }, [])
    return (

        <div>
            {isLogin ? (
                <div className="relative">
                    <SideBar user={params} />
                    <div className="absolute h-full left-[60px] md:left-[100px] md:w-[calc(100vw-200px)] w-[calc(100vw-60px)] p-4">
                        {children}
                    </div>
                </div>
            ) : (
                <div>Loading</div>
            )}
        </div>
    )
}

export default LayoutMain