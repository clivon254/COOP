

import React, { useContext, useEffect, useState } from 'react'
import Stats from '../components/Stats'
import axios from 'axios'
import Graph from '../components/Graph'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { RecentFollowerTable, RecentPostTable } from '../components/Table'
import { StoreContext } from '../context/store'

export default function Dashboard() {

    const {themes} = useSelector(state => state.theme)

    const {data} = useContext(StoreContext)

  return (

    <div className="w-full px-5 py-5 md:px-7 lg:px-10">

      <Stats dt={data}/>
      
      {/* graph */}
      <div className="w-full py-8">

        <p className="py-5 text-base font-medium">
          View stats for last 28 days
        </p>

        <Graph dt={data.veiwStats} />

      </div>

      <div className="flex gap-6 flex-col md:flex-row py-6">

          {/* recent followers */}
          <div className="w-full md:w-1/3 flex flex-col ">

              <span className={clsx("py-5 text-base font-bold",themes ? "text-slate-600":"text-white")}>
                Recent followers
              </span>

              <RecentFollowerTable data={data?.last5followers?.followers}/>

          </div>

          {/* Top 5 contents */}
          <div className="w-full md:w-2/3 flex flex-col ">

              <span className={clsx("py-5 text-base font-bold",themes ? "text-slate-600":"text-white")}>
                Recent Post
              </span>

              <RecentPostTable data={data?.last5posts}/>

          </div>

      </div>

    </div>
    
  )

}
