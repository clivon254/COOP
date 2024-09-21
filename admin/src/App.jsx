

import React from 'react'
import {BrowserRouter,Routes ,Route,Navigate, Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import {Toaster} from "sonner"
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Posts from './pages/Posts'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import Users from './pages/Users'
import Analytics from './pages/Analytics'
import PostPage from './pages/PostPage'



function Layout()
{
    const {User} = useSelector((state) => state.user)

    return(

      User ? 
      <div className="">

        <Outlet/>

      </div> 
      : 
      <Navigate to="/landing-page" />
    )
}

export default function App() {

  return (

    <BrowserRouter>

        <Toaster richColors/>

        <main className="">

          <Routes>

            <Route element={<Layout/>}>

                <Route path="/" element={<Dashboard/>}/>

                <Route path="/posts" element={<Posts/>}/>

                <Route path="/add-post" element={<AddPost/>}/>

                <Route path="/edit-post" element={<EditPost/>}/>

                <Route path="/users" element={<Users/>}/> 

                <Route path="/analytics" element={<Analytics/>}/>

                <Route path="/post/:slud" element={<PostPage/>}/>

            </Route>

            <Route path="/landing-page" element={<LandingPage/>}/>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/sign-up" element={<SignUp/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          </Routes>

        </main>

    </BrowserRouter>

  )

}
