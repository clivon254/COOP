

import React, { useContext, useState } from 'react'
import COOP from "../assets/COOP-IMG.png"
import Logo from '../components/Logo'
import Divider from '../components/Divider'
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { StoreContext } from '../context/store'
import {toast} from "sonner"
import OAuth from '../components/OAuth'




export default function SignIn() {

  const {url} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const {loading,error} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  console.log(formData)

  const axiosInstance = axios.create({
    withCredentials: true,
    xhrFields: { withCredentials: true },
  });
  

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(!formData.email || !formData.password)
    {
      return dispatch(signInFailure("Please fill all the feilds"))
    }

    try
    {

      dispatch(signInStart())

      const res = await axiosInstance.post(url + "/api/auth/sign-in",formData)

      if(res.data.success)
      {
        dispatch(signInSuccess(res.data.rest))  

        toast.success("You have signed in sucessfully")

        navigate('/')
      }
      else
      {
        dispatch(signInFailure(res.data.message))
        
        console.log(res.data.message)
      }
    }
    catch(error)
    {
      dispatch(signInFailure(error.message))

      console.log(error.message)

    }

  }


  return (

    <div className="flex w-full h-screen">

      <div className="hidden md:flex flex-col gap-y-4 md:w-1/3 min-h-screen bg-black items-center justify-center">

          <img 
              src={COOP}
              alt="" 
              className="" 
          />

          <Logo />

          <span className="text-2xl font-bold text-white">
            Welcome 
          </span>

      </div>

      <div className="  w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black ">
          
          <div className="h-full flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

            <div className="block md:hidden mb-5">
              <Logo/>
            </div>

            <div className="max-w-md w-full space-y-8">

              <div className="">

                <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Sign in to your account
                </h2>

              </div>

              <OAuth/>

              <Divider label="or sign with email"/>

              <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                <div className="flex flex-col gap-y-2">

                  <Label value="email"/>

                  <input
                    type="email"
                    placeholder='example@gmail.com'
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-full text-sm py-2 dark:text-black"
                  />

                </div>

                <div className="flex flex-col gap-y-2">

                  <Label value="password"/>

                  <input
                    type="text"
                    placeholder='************'
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-full text-sm py-2 dark:text-black"
                  />

                </div>

                <div className="flex justify-center ">

                  <Button
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                    disabled={loading}
                    pill
                    className="w-full"
                  >
                    {
                      loading 
                        ? 
                        <>
                          <Spinner className="mr-2"/> Loading
                        </>
                        :
                        "Sign in"
                    }
                  </Button>

                </div>

                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">

                  <p className="text-xs font-semibold">
                    Don't have an account? 
                    <Link to='/sign-up' className="text-amber-800 font-medium ml-2 cursor-pointer">Sign up</Link>
                  </p>

                  <p className="text-xs font-semibold">

                    <Link to="/forgot-password" className="text-amber-400 font-medium ml-2">forgot password?</Link>

                  </p>

                </div>

              </form>

              {error && (

                <Alert color="failure">{error}</Alert>

              )}

            </div>

          </div>

      </div>

    </div>

  )

}
