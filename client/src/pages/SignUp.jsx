

import React from 'react'
import COOP from "../assets/COOP-IMG.png"
import Logo from '../components/Logo'
import { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import OAuth from '../components/OAuth'
import Divider from '../components/Divider'
import {Button,Label,TextInput,Spinner,Alert} from "flowbite-react"
import {useSelector,useDispatch} from "react-redux"
import {toast} from 'sonner'
import axios from "axios"


export default function SignUp() {

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({})

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  console.log(formData)

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData , [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(!formData.email || !formData.password || !formData.username)
    {
      return setError("Please fill all the feilds")
    }

    try
    {

      setLoading(true)

      setError(null)

      const res = await axios.post("/api/auth/sign-up",formData)

      if(res.data.success)
      {  

        setLoading(false)

        setError(null)

        toast.success("You have signed in sucessfully")

        navigate('/sign-in')
      }
      else
      {
        setLoading(false)
        
        console.log(res.data.message)

        setError(res.data.message)
      }
    }
    catch(error)
    {
      setLoading(false)

      setError(error.message)

      console.log(error.message)

    }

  }


  return (

    <div className="flex w-full min-h-screen">

      {/* LEFT */}
      <div className="hidden md:flex flex-col gap-y-4 md:w-1/3 bg-black items-center justify-center">

        <img 
          src={COOP} 
          alt="" 
          className="" 
        />

        <Logo/>

        <span className="text-2xl font-bold text-white">
          Welcome 
        </span>

      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black items-center px-4 md:px-20 lg:px-40">
        
        <div className="w-full h-full flex flex-col items-center justify-center py-12 px-4 sm:px-0 lg:px-8">

            <div className="block mb-10 md:hidden -ml-8">

              <Logo />

            </div>

            <div className="w-full space-y-6 flex flex-col justify-start">

                <div className="max-w-md w-full flex gap-3 md:gap-4 items-center jusftify-center mb-12">
                  {showForm && (
                    <IoArrowBackCircleSharp
                      className="text-2xl lg:text-3xl cursor-pointer text-gray-800 dark:text-gray-400"
                      onClick={() => setShowForm(false)}
                    />
                  )}

                  <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                    Sign up for an account
                  </h2>

                </div>

                {showForm ? 
                  (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

                        {/* username */}
                        <div className="flex flex-col gap-y-2">

                          <Label value="username"/>

                          <input
                            type="text"
                            placeholder='username'
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="rounded-full text-sm py-2"
                          />

                        </div>

                        {/* email */}
                        <div className="flex flex-col gap-y-2">

                          <Label value="email"/>

                          <input
                            type="email"
                            placeholder='example@gmail.com'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="rounded-full text-sm py-2"
                          />

                        </div>

                        {/* password */}
                        <div className="flex flex-col gap-y-2">

                          <Label value="password"/>

                          <input
                            type="text"
                            placeholder='************'
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="rounded-full text-sm py-2"
                          />

                        </div>

                        {/* button */}
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
                                "Sign Up"
                            }
                          </Button>

                        </div>

                        {error && (

                           <Alert color="failure" className="mt-5">{error}</Alert>

                         )}

                   </form>
                  ) 
                  : 
                  (
                    <>
                      <div className="max-w-md w-full space-y-8">

                          <OAuth />

                          <Divider label="OR" />

                          <Button
                            type="button"
                            onClick={() => setShowForm(true)}
                            gradientDuoTone="pinkToOrange"
                            pill
                            className="mx-auto w-full"
                          >
                            Continue with email
                          </Button>
                      </div>
                    </>
                  )
                }

                <p className="max-w-md w-full text-center text-gray-600 dark:text-gray-300">
                  Already has an account? {" "}
                  <Link to='/sign-in' className="text-rose-500 font-medium">
                    Sign in
                  </Link>
                </p>

            </div>

        </div>

      </div>

    </div>

  )
  
}
