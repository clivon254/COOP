

import axios from 'axios'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'

export default function ForgotPassword() {

  const {url} = useContext(StoreContext)

  const [formData, setFormData] = useState({})
  
  const [loading ,setLoading] = useState(false)

  const [error, setError] = useState(null)

  const [success, setSuccess] = useState(false)


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      setLoading(true)

      const res = await axios.post(url + "/api/auth/forgot-password",formData)

        if(res.data.success)
        {
          setSuccess(true)

          setLoading(false)

          setError(null)

          setFormData({})
        }
        else
        {
          setError(res.data.message)

          setLoading(false)

          setSuccess(false)
        }

    }
    catch(error)
    {
      setError(error.message)

      setLoading(false)

      setSuccess(false)
    }

  }


  return (

    <div className="w-full h-screen flex justify-center items-center px-5 ">

        <div className="space-y-5">

          <p className="max-w-xl mx-auto text-center font-semibold">Enter your email and a link will be sent to your email account for rest</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

            <div className="flex flex-col gap-y-2">

              <Label value="email"/>

              <TextInput
                  type="email"
                  placeholder='example@gmail.com'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
              />

            </div>

             <Button
                type='submit'
                gradientDuoTone="pinkToOrange"
                disabled={loading}
                pill
             >
              {loading ? 
                <>
                  <Spinner/> Loading ....
                </>
                :
                "Submit"
              }
             </Button>

          </form>

          {success && (

            <Alert color="success">Link sent to your email</Alert>

          )}

          {error && (

            <Alert color="failure">{error}</Alert>

          )}

        </div>

    </div>
    
  )

}
