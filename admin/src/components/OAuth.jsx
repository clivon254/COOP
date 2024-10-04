

import React, { useContext } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInFailure, signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { StoreContext } from '../context/store'



export default function OAuth() {

    const {url} = useContext(StoreContext)
    const auth = getAuth(app)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleGoogleClick = async () => {

        const provider = new GoogleAuthProvider()

        provider.setCustomParameters({prompt:'select_account'})

        try
        {
            const resultsFromGoogle = await signInWithPopup(auth ,provider)

            let data = {
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.displayName
            }

            const res = await axios.post(url + '/api/auth/google', data)

            if(res.data.success)
            {
                dispatch(signInSuccess(res.data.rest))

                localStorage.setItem("token",res.data.token)

                setToken(res.data.token)

                navigate('/')

            }
        }
        catch(error)
        {
            dispatch(signInFailure(error.message))
        }
    }

  return (

    <div>

        <button 
            className="w-full flex flex-row-reverse justify-center items-center gap-4 bg-white dark:transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300 font-semibold"
            onClick={handleGoogleClick}
        >
            Sign in with Google <FcGoogle/>
        </button>

    </div>

  )

}
