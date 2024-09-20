

import React, { createContext } from 'react'

export const StoreContext = createContext(null)

export default function StoreContextProvider(props) {

    const url = "http://localhost:800"

    const contextValue = {}

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}
        
    </StoreContext.Provider>

  )

}
