

import React, { useRef, useState ,useEffect, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { deleteUserFailure, deleteUserSuccess, signOutSuccess, updateUserFailure, updateUserStart,updateUserSuccess } from '../redux/user/userSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { app } from '../firebase'
import { StoreContext } from '../context/store'


export default function Profile() {

    const {url,token} = useContext(StoreContext)

    const {User ,error ,loading} = useSelector(state => state.user)

    const [imageFile ,setImageFile] = useState(null)

    const [imageFileUrl ,setImageFileUrl] = useState(null)

    const [imageFileImageUploading ,setImageFileUploading] = useState(false)

    const [imageFileImageUploadProgress ,setImageFileUploadProgress] = useState(null)

    const [imageFileImageUploadError ,setImageFileUploadError] = useState(null)

    const [updateSuccess, setUpdateSuccess] = useState(null)

    const [updateError, setUpdateError] = useState(null)

    const [formData, setFormData] = useState({})

    const [showModal ,setShowModal] = useState(false)


    const filePickerRef = useRef()

    const dispatch = useDispatch()

    axios.defaults.withCredentials = true
    

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if(file)
        {
            setImageFile(file)

            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {


        if(imageFile)
        {
            uploadImage()
        }
    },[imageFile])
    

    const uploadImage = async () => {

        setImageFileUploading(true)

        setImageFileUploadError(null)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + imageFile.name

        const storageRef = ref(storage ,fileName)

        const uploadTask = uploadBytesResumable(storageRef , imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setImageFileUploadProgress(progress.toFixed(0)) 
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must less than 2MB)')

                setImageFileUploadProgress(null)

                setImageFile(null)

                setImageFileUrl(null)

                setImageFileUploading(false)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setImageFileUrl(downloadURL)

                    setFormData({...formData, profilePicture:downloadURL})

                    setImageFileUploading(false)

                })
            }
        )
    }


    // handleChange
    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]: e.target.value})

    }


    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        if(Object.keys(formData).length === 0)
        {
            setUpdateError('No changes made')

            return;
        }

        if(imageFileImageUploading)
        {
            setUpdateError("please waite for the image to finish uploading")

            return
        }

        try
        {
            dispatch(updateUserStart())

            const res = await axios.put(url + `/api/user/update-user/${User._id}`,formData,{headers:{token}})

            if(res.data.success)
            {
                dispatch(updateUserSuccess(res.data.rest))

                toast.success("profile update successfully")

            }
        }
        catch(error)
        {
            setUpdateError(error.message)

            dispatch(updateUserFailure(error.message))

            console.log(error.message)
        }
    }

    // handleDeleteUser
    const handleDeleteUser = async () => {

        try
        {
            const res = await axios.delete(url + `/api/user/delete/${User._id}`)

            if(res.data.success)
            {
                dispatch(deleteUserSuccess())

                navigate('/landing-page')
            }
        }
        catch(error)
        {
            console.log(error.message)

            dispatch(deleteUserFailure())
        }

    }

    // handleSignout
    const handleSignout = async () => {

        try
        {
            
            dispatch(signOutSuccess())

            localStorage.removeItem('token')

            toast.success("sign out successfully") 

            navigate('/')
            
        }
        catch(error)
        {
            console.log(error.message)
        }

    }
    

  return (

    <div className="max-w-lg mx-auto p-5 w-full">

        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                ref={filePickerRef}
                hidden
            />

            <div  
                className="relative w-32 h-32 self-center cursor-pointer shado-md overflow-hidden rounded-full"
                onClick={() => filePickerRef.current.click()}
            >
                {imageFileImageUploadProgress && (

                    <CircularProgressbar
                        value={imageFileImageUploadProgress || 0}
                        text={`${imageFileImageUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root:{
                                width:'100%',
                                height:'100%',
                                position:"absolute",
                                top:0,
                                left:0
                            },
                            path:{
                                stroke:`rgba(62, 152, 199, ${
                                    imageFileImageUploadProgress/100
                                })`
                            }
                        }}
                    />
                )}

                <img 
                    src={imageFileUrl || User.profilePicture}
                    alt="user" 
                    className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                        imageFileImageUploadProgress &&
                        imageFileImageUploadProgress < 100 && 'opacity-60'
                    }`}
                />
            </div>

            {imageFileImageUploadError &&(

                <Alert color="failure">{imageFileImageUploadError}</Alert>
            )}

            <TextInput
                type='text'
                name="username"
                placeholder='username'
                defaultValue={User.username}
                onChange={handleChange}
            />

            <TextInput
                type='email'
                name="email"
                placeholder='email'
                defaultValue={User.email}
                onChange={handleChange}
            />

            <TextInput
                type='password'
                name="password" 
                placeholder='********'
                onChange={handleChange}
            />

            <Button
                type="submit"
                gradientDuoTone='purpleToBlue'
                outlined
                disabled={loading || imageFileImageUploading}
            >
                {loading ? "Loading ...." :"update"}
            </Button>

        </form>

        <div className="text-red-500 flex justify-between mt-5">

            <span onClick={() => setShowModal(true)} className="cursor-pointer">
                Delete Account
            </span>

            <span onClick={handleSignout} className="cursor-pointer">
                Sign out
            </span>

        </div>

        {updateSuccess && (
            <Alert color="success" className="mt-5">{updateSuccess}</Alert>
        )}

        {updateError && (
            <Alert color="failure" className="mt-5">{updateError}</Alert>
        )}

        <Modal
            show={showModal}
        >

        </Modal>

    </div>

  )

}
