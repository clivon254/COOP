

import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import axios from 'axios';
import { toast } from 'sonner';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useContext } from 'react';
import { StoreContext } from '../context/store';

export default function AddPost() {

  const {url,token} = useContext(StoreContext)

  const [loading, setloading] = useState(null)
  
  const [file,setFile] = useState(null)

  const [imageUploadProgress, setImageUploadProgress] = useState(null)

  const [imageUploadError ,setImageUploadError] = useState(null)

  const [formData, setFormData] = useState({})

  const [publishError,setPublishError] = useState(null)

  const navigate = useNavigate()


  // handleImageUpload 
  const handleUploadImage = async () => {

    try
    {
        if(!file)
        {
          setImageUploadError("Please select an image")
          return
        }

        setImageUploadProgress(null)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + '-' + file.name

        const storageRef = ref(storage, fileName)

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
          'state_changed',
          (snapshot) => {

            const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100 ;
            
            setImageUploadProgress(progress.toFixed(0))
          },
          (error) => {

            setImageUploadError('Image upload failed')

            setImageUploadProgress(null)
          },
          () => {

            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

              setImageUploadProgress(null)

              setImageUploadError(null)

              setFormData({...formData, image:downloadURL})
            })
          }
        )
    }
    catch(error)
    {
        setImageUploadError('Image upload failed')

        setImageUploadProgress(null)

        console.log(error)

    }

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

      setloading(true)

      const res = await axios.post(url + "/api/post/create-post",formData,{headers:{token}})

      if(res.data.success)
      {
        toast.success("post created")

        navigate(`/post/${res.data.newPost.slug}`)

        setloading(false)

      }
      else
      {
        setPublishError(res.data.message)

        setloading(false)
      }

    }
    catch(error)
    {
      setPublishError(error.message)

      setloading(false)
    }

  }


  return (

    <div className="p-5 max-w-3xl mx-auto ">

       
        <h1 className="text-3xl font-semibold text-center mb-7">Add Post</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">

            <TextInput
              type='text'
              placeholder='Title'
              required
              id="title"
              className="flex-1"
              onChange={(e) =>
                setFormData({...formData, title : e.target.value})
              }
            />

            <Select
              onChange={(e) => 
                setFormData({...formData, category:e.target.value})
              }
            >
                <option value="uncategorized" >Choose an option</option>

                <option value="Education" >Education</option>

                <option value="politics" >politics</option>

                <option value="Fashion" >Fashion</option>

                <option value="Sports" >Sports</option>

                <option value="Fun" >Fun</option>

            </Select>

          </div>

          <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 rounded-md">

            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />

            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress 
                ? 
                (
                  <div className="w-16 h-16">
                      <CircularProgressbar
                        value={imageUploadProgress}
                        text={`${imageUploadProgress || 0}%`}
                      />
                  </div>
                )
                :
                (
                  "Upload Image"
                )
              }
            </Button>

          </div>

          {imageUploadError && (

            <Alert color={failure}>{imageUploadError}</Alert>

          )}

          {formData?.image && (

            <img 
              src={formData?.image}
              alt="upload" 
              className="w-full h-72 object-cover" 
            />
          )}

          <ReactQuill
            theme='snow'
            placeholder="write something"
            className="h-72 mb-12"
            required
            onChange={(value) => {
              setFormData({...formData, description:value})
            }}
          />

          <Button
            type="submit"
            gradientDuoTone='purpleToPink'
            className='mt-5'
          >
            Publish
          </Button>

          {publishError && (

            <Alert className="mt-5" color='failure'>{publishError}</Alert>
          )}

        </form>

    </div>

  )
  
}
