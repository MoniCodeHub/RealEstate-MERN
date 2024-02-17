import React from 'react'
import {useSelector} from 'react-redux'
import { Outlet, Navigate} from 'react-router-dom'

export default function PrivateRoute() {
    const { currentUser} = useSelector ((state) => state.user);
   return (
        currentUser ? <Outlet/> : <Navigate to='/sign-in'/>  // will show the profile page if logged in || redirects to sign-in page
   )
}
