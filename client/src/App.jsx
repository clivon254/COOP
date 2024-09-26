

import React from 'react'
import {BrowserRouter,Routes ,Route,Navigate, Outlet} from "react-router-dom"
import {useSelector} from "react-redux"
import {Toaster} from "sonner"
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Posts from './pages/Posts'
import AddPost from './pages/AddPost'
import EditPost from './pages/EditPost'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import Profile from './pages/Profile'
import WriterPage from './pages/WriterPage'
import FooterComp from './components/FooterComp'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Search from './pages/Search'
import Category from './pages/Category'
import OnlyWriterPrivateRoute from './pages/OnlyWriterPrivateRoute'
import Post from '../../server/model/postModel'
import Analytics from './pages/Analytics'



function Layout()
{
    const {User} = useSelector((state) => state.user)

    return(

     
      <div className="w-full flex flex-col min-h-screen ">
        
        <Header/>

        <div className="w-full flex-1">

          <Outlet/>

        </div>

        <FooterComp/> 

      </div> 
     
    )
}

export default function App() {

  return (

    <BrowserRouter>

        <Toaster richColors/>

        <main className="min-h-screen w-full">

          <Routes>

            <Route element={<Layout/>}>

                <Route path="/" element={<HomePage/>}/> 

                <Route path="/profile" element={<Profile/>}/>

            
                <Route  element={<OnlyWriterPrivateRoute/>}>

                    <Route path="/edit-post/:slug" element={<EditPost/>}/>

                    <Route path="/add-post" element={<AddPost/>}/>

                    <Route path="/dashboard" element={<Dashboard/>}/>

                    <Route path="/posts" element={<Post/>}/>

                    <Route path="/analytics" element={<Analytics/>}/>

                </Route>

                <Route path="/about" element={<About/>}/>

                <Route path="/contact" element={<Contact/>}/>

                <Route path="/search" element={<Search/>}/>

                <Route path="/category" element={<Category/>}/>

                <Route path="/post/:slug" element={<PostPage/>}/>

                <Route path="/writer/:writerId" element={<WriterPage/>}/>

            </Route>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/sign-up" element={<SignUp/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          </Routes>

        </main>

    </BrowserRouter>

  )

}
