

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
import Header from './components/Header'
import DashSidebar from './components/DashSidebar'
import Profile from './pages/Profile'
import WriterPage from './pages/WriterPage'



function Layout()
{
    const {User} = useSelector((state) => state.user)

    return(

      User ? 
      <div className="">
        
        <Header/>

        <div className="w-full flex flex-row">

            <div className="hidden md:block md:w-1/5  border-r min-h-screen">

                <DashSidebar/>

            </div>

            <div className="w-full md:w-4/5">

                <Outlet/>

            </div>

        </div>

      </div> 
      : 
      <Navigate to="/landing-page" />
    )
}

export default function App() {

  return (

    <BrowserRouter>

        <Toaster richColors/>

        <main className="min-h-screen w-full">

          <Routes>

            <Route element={<Layout/>}>

                <Route path="/" element={<Dashboard/>}/>

                <Route path="/posts" element={<Posts/>}/>

                <Route path="/profile" element={<Profile/>}/>

                <Route path="/add-post" element={<AddPost/>}/>

                <Route path="/edit-post/:slug" element={<EditPost/>}/>

                <Route path="/users" element={<Users/>}/> 

                <Route path="/analytics" element={<Analytics/>}/>

                <Route path="/post/:slug" element={<PostPage/>}/>

                <Route path="/writer/:writerId" element={<WriterPage/>}/>

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
