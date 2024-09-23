


import React, { useContext, useState } from 'react'
import { FaUsers, FaUsersCog } from "react-icons/fa"
import { BsArrowDownRight, BsArrowUpRight, BsEye, BsPostcardHeart } from "react-icons/bs"
import { StoreContext } from '../context/store'

const icons ={
    user:FaUsersCog,
    view:BsEye,
    post:BsPostcardHeart,
    users:FaUsers
}

export default function Stats({dt}) {

    const {Loading,setLoading,Error,setError} = useContext(StoreContext)

    const [loader,setLoader] = useState([{},{},{},{}])

    const data = [
        {
            title:"TOTAL POST",
            icon:"post",
            value:dt?.totalPostsAdmin,
            diff:34
        },
        {
            title:"TOTAL USERS",
            icon:"users",
            value:dt?.totalUsersAdmin,
            diff:-13
        },
        {
            title:"TOTAL VIEWS",
            icon:"view",
            value:dt?.totalVeiwsAdmin,
            diff:18
        },
        {
            title:"TOTAL WRITERS",
            icon:"user",
            value:dt?.totalWritersAdmin,
            diff:-30
        }
    ]

    const stats = data?.map((stat) => {

        const Icon = icons[stat.icon]

        const DiffIcon = stat.diff > 0 ? BsArrowUpRight : BsArrowDownRight

        return(

            <div className="border dark:border-slate-700 p-2 rounde-full shadow-sm" key={stat.title}>

                <div className="flex items-center justify-between text-sm">

                    <span className="capitalize">{stat.title}</span>

                    <Icon size="1.4rem" stroke={1.5} />

                </div>

                <div className="flex items-center gap-3">

                    <span className="text-2xl 2xl:text-4xl font-serif">{stat.value}</span>

                    <span className={`text-xs flex items-center gap-1 ${stat.diff > 0 ? "text-teal-500": "text-red-500" }`}>
                        {stat.diff}%
                        <DiffIcon size='1rem'/>
                    </span>

                </div>

                <span className="block text-xs">
                    compare to previous month
                </span>

            </div>

        )
    })

  return (
    <>

    {Loading && !Error &&(
        
       <div className="grid grid-cols-1 sm:grid-cols-2 ld:grid-cols-4 gap-5">
            {
                loader.map((loader, index) => (

                    <div key={index} className="border dark:border-slate-700 p-2 rounde-md shadow-sm animate-pulse space-y-2" >

                        <div className="flex items-center justify-between text-sm ">

                            <span className="capitalize w-40 h-5 bg-slate-200 dark:bg-slate-600 rounded-full"/>

                            <span className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-600"/>

                        </div>

                        <div className="w-40 h-5 bg-slate-200 dark:bg-slate-600 rounded-full "/>

                        <span className="block w-40 h-5 bg-slate-200 dark:bg-slate-600 rounded-full"/>
            
                    </div>

                ))
            }
            

      </div>
         
        
    )}

    {!Loading && !Error &&(
        <div className="grid grid-cols-1 sm:grid-cols-2 ld:grid-cols-4 gap-5">
            {stats}
        </div>
    )}

    {!Loading && Error && (

        <div className="max-w-64 mx-auto space-y-3">

            <span className="block text-center text-xl font-semibold dark:text-white">
                Connection failed!
            </span>

            <span className="block text-center text-xs">
                Check your connection to the internet and try again
            </span>

            <span className="block border w-3/5 py-2 rounded-full text-center mx-auto">
                Retry
            </span>

        </div>
    )}

    </>
  )

}
