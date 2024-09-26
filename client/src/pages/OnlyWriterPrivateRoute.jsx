

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function OnlyWriterPrivateRoute() {

    const {User} = useSelector((state) => state.user)

  return User && User.accountType === "writer" ?
    (
        <Outlet/>
    )
    :
    (
        <Navigate to="/"/>
    )

}
