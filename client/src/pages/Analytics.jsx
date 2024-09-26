

import { Select } from 'flowbite-react'
import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Stats from '../components/Stats'
import Graph from '../components/Graph'

export default function Analytics() {

  const {data} = useContext(StoreContext)

  return (

    <div className="w-full px-5 md:px-10 py-5">

      <div className="w-full flex items-center justify-between mb-5">

        <p className="text-2xl font-semibold dark:text-white text-slate-700">
          Analytics
        </p>

        <Select>

          <option value="28">28 days</option>

          <option value="14">14 days</option>

          <option value="7">7 days</option>

        </Select>

      </div>

      <Stats dt={data} />

      <div className="w-full py-8">

        <p className="py-5 text-base font-medium">
          View stats for last 28 days
        </p>

        <Graph dt={data.veiwStats} />

      </div>

      <div className="w-full py-8">

        <p className="py-5 text-base font-medium">
          Follower stats for last 28 days
        </p>

        <Graph dt={data.followerStats} />

      </div>

    </div>

  )
}
