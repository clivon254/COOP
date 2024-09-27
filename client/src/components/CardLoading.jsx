


import React from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineArrowRight} from "react-icons/ai"


export default function CardLoading({post}) {

  return (

    <div
        className={`w-full flex flex-col gap-8 md:items-start rounded md:flex-row animate-pulse`}
    >

        <div className="h-64 w-full md:w-1/2 bg-gray-300 rounded animate-pulse"/>

        <div className="w-full md:w-1/2 flex flex-col gap-3 animate-pulse">

            <span className="h-3 w-full rounded-full bg-gray-300 animate-pulse"/>

            <span className="h-5 w-full rounded-full bg-gray-300 animate-pulse"/>

            <span className="h-5 w-full rounded-full bg-gray-300 animate-pulse"/>

            <div className="h-24 w-full rounded-xl bg-gray-300 animate-pulse"/>

            <span className=" h-5 w-full rounded-full bg-gray-300 animate-pulse"/>  

        </div>

    </div>

  )

}
