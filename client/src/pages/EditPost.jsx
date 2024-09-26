



import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useNavigate, useParams } from 'react-router-dom';
import { app } from '../firebase';
import axios from 'axios';
import { toast } from 'sonner';
import { Alert, Button, FileInput, Select, Spinner, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function EditPost() {

  const [loading, setloading] = useState(null)
  
  const [file,setFile] = useState(null)

  const [imageUploadProgress, setImageUploadProgress] = useState(null)

  const [imageUploadError ,setImageUploadError] = useState(null)

  const [formData, setFormData] = useState({})

  const [publishError,setPublishError] = useState(null)

  const navigate = useNavigate()

  const {slug} = useParams()

  const [loader ,setLoader] = useState(false)

  const {User} = useSelector(state => state.user)


  useEffect(() => {

    const fetchPost = async () => {

      try
      {
        setLoader(true)

        const res = await axios.post(`/api/post/get-post/${slug}`)

        if(res.data.success)
        {
          setFormData(res.data.post)

          setLoader(false)
        }
        else{
          setPublishError(res.data.message)

          setLoader(false)
        }

      }
      catch(error)
      {
        setPublishError(error.message)

        setLoader(false)
      }
    }

    fetchPost()
    
  },[slug])

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

      const res = await axios.put(`/api/post/update-post/${formData._id}/${User._id}`,formData)

      if(res.data.success)
      {
        toast.success("post updated")

        navigate(`/post/${res.data.updatedPost.slug}`)

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

      console.log(error.message)

      setloading(false)
    }

  }


  return (
    <>

    {!loader && (
      <div className="p-5 max-w-3xl mx-auto ">

          <h1 className="text-3xl font-semibold text-center mb-7">Update Post</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">

              <TextInput
                type='text'
                placeholder='Title'
                defaultValue={formData?.title}
                required
                id="title"
                className="flex-1"
                onChange={(e) =>
                  setFormData({...formData, title : e.target.value})
                }
              />

              <Select
                defaultValue={formData?.category}
                onChange={(e) => 
                  setFormData({...formData, category:e.target.value})
                }
              >
                  <option value="uncategorized" >Choose an option</option>

                  <option value="Education" >Education</option>

                  <option value="politics" >politics</option>

                  <option value="Fashion" >Fashion</option>

                  <option value="Sports" >Sports</option>

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
              defaultValue={formData?.description}
              onChange={(value) => {
                setFormData({...formData, description:value})
              }}
            />

            <Button
              type="submit"
              gradientDuoTone='purpleToPink'
              className='mt-5'
              disabled={loading}
            >
              {loading ?
                (
                  <>
                    <div className="flex items-center">

                      <Spinner className="mr-2"/> Loading ...

                    </div>
                  </>
                )
                :
                ("Publish")
              }
            </Button>

            {publishError && (

              <Alert className="mt-5" color='failure'>{publishError}</Alert>
            )}

          </form>


      </div>
    )}

    {loader && (

        <div className="text-center my-auto">
          <Spinner/> Loading ...
        </div>

    )}

    </>

  )
  
}
