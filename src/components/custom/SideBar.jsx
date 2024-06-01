"use client"
import { useRouter } from 'next/navigation'

const component = [
    {
        link: "",
        title: "home",
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M4 11h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a3 3 0 0 1-2.995-2.824L3 18v-6a1 1 0 0 1 1-1m17 1v6a3 3 0 0 1-2.824 2.995L18 21h-6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1m-3-9a3 3 0 0 1 2.995 2.824L21 6v2a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM9 4v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a3 3 0 0 1 2.824-2.995L6 3h2a1 1 0 0 1 1 1" /></svg>
    },
    // {
    //     link:"?side=posting",
    //     title:"Posting",
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M20 17V7c0-2.168-3.663-4-8-4S4 4.832 4 7v10c0 2.168 3.663 4 8 4s8-1.832 8-4M12 5c3.691 0 5.931 1.507 6 1.994C17.931 7.493 15.691 9 12 9S6.069 7.493 6 7.006C6.069 6.507 8.309 5 12 5M6 9.607C7.479 10.454 9.637 11 12 11s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2zM6 17v-2.393C7.479 15.454 9.637 16 12 16s4.521-.546 6-1.393v2.387c-.069.499-2.309 2.006-6 2.006s-5.931-1.507-6-2" /></svg>
    // },
    // {
    //     link: "?side=history",
    //     title: "History",
    //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18m-1 5v5l4.28 2.54l.72-1.21l-3.5-2.08V8z" /></svg>
    // },
]

const SideBar = ({user}) => {
    const router = useRouter()
    return (
        <>
            <aside className='fixed group top-0 left-0 w-[60px] bg-gray-700 min-h-screen hover:w-[200px] duration-300 p-2 z-10'>
                <ul className='w-full'>
                    {component.map((row, i) => {
                        return (
                            <li className='flex items-center justify-start gap-3 hover:bg-gray-600 duration-150 hover:cursor-pointer p-2' key={i} onClick={() => router.push(`/${user.product}/${user.user}/${row.link}`)}>
                                {row.icon}
                                <span className='group-hover:block hidden font-semibold text-sm duration-300'>{row.title}</span>
                            </li>
                        )
                    })}
                </ul>
            </aside>
        </>
    )
}

export default SideBar