

import React from 'react'
import {useSelector} from "react-redux"

export default function ThemeProvider({children}) {

    const {themes} = useSelector(state => state.theme)

  return (

    <div className={themes}>

        <div className="bg-white text-gray-700 dark:text-gray-200 dark:bgblack min-h-screen">
            {children}
        </div>

    </div>

  )

}
