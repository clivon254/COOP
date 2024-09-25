

import React from 'react'

export default function Divider({label}) {

  return (

    <div className="flex items-center my-2">

        <div className="flex-1 border-t border-gray-300 dark:border-gray-500"/>

        <div className="mx-4 text-gray-400 text-sm">{label}</div>

        <div className="flex-1 border-t border-gray-300 dark:border-gray-500"/>

    </div>

  )

}
