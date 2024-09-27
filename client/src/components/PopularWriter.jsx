


import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber } from '../utils'
import { StoreContext } from '../context/store'

export default function PopularWriter({data}) {

  const {Loading, setLoading} = useContext(StoreContext)

  const [loader, setLoader] = useState([{},{},{},{}])

  return (

    <div className="w-full">

        <p className="font-bold text-gray-600 dark:text-slate-500 mb-3">
            Popular Writers
        </p>

        <div className="flex flex-col gap-y-3">

            {!Loading && (
                <>
                    {data?.map((writer, id) => (

                        <Link
                            to={`/writer/${writer?._id}`}
                            key={id}
                            className="flex gap-2 items-center"
                        >

                            <img 
                                src={writer?.profilePicture}
                                alt={writer?.username}
                                className="w-12 h-12  rounded-full object-cover" 
                            />

                            <div className="flex flex-col gap-1">

                                <span className="text-base font-semibold text-slate-800 dark:text-slate-500 ">
                                    {writer?.username}
                                </span>

                                <span className="text-rose-800 font-medium">
                                    {formatNumber(writer?.followers)}{" "}
                                    <span className="text-gray-600">Followers</span>
                                </span>

                            </div>

                        </Link>
                    ))}
                </>
            )}
            
            {Loading && (
                <>
                    {loader?.map((writer, id) => (

                        <div
                            key={id}
                            className="flex gap-2 items-center w-full animate-pulse"
                        >

                            <span  className="w-12 h-12  rounded-full object-cover bg-gray-300"/>

                            <div className="flex flex-col gap-1">

                                <span className=" h-3 w-32 rounded-full bg-gray-300"/>
                            
                                <span className=" h-3 w-32 rounded-full bg-gray-300"/>

                            </div>

                        </div>
                    ))}
                </>
            )}

        </div>

    </div>

  )

}
