





import axios from 'axios'
import { Button, Modal, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Comments from './Comments'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function CommentSection({postId}) {

  const {url} = useContext(StoreContext)
  const {User} = useSelector(state => state.user)

  const [formData, setFormData] = useState({
    userId:User?._id,
    postId,
    comment:'',
  })

  const [Loading, setLoading] = useState(false)

  const [comments ,setComments] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [commentToDelete , setCommentToDelete] = useState(null)

  const navigate = useNavigate()



  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(formData.content.length > 500)
    {
      return
    }

    try
    {
        setLoading(true)

        const res = await axios.post(url + '/api/comment/create-comment',formData,{withCredentials:true})

        if(res.data.success)
        {
          setLoading(false)

          fetchComments()

          toast.success("comment added successfully")
        }
    }
    catch(error)
    {
      console.log(error.messega)
    }
  }
  
  // fetchcomments
  const fetchComments = async () => {

    try
     {
      const res = await axios.get(url + `/api/comment/get-postcomment/${postId}`)

      if(res.data.success)
      {
          setComments(res.data.comments)
      }

     }
    catch(error)
    {
      console.log(error.message)
    }
  }

  useEffect(() => {

    fetchComments()

  },[postId,User])

  // handleLike
  const handleLike = async (commentId) => {

    try
    {
      if(!User)
      {
        navigate('/sign-in')
        return
      }

      const res = await axios.post(url +`/api/comment/like-comment/${commentId}`,{withCredentials:true})

      if(res.data.success)
      {

        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: res.data.comment.likes,
                  numberOfLikes: res.data.comment.likes.length,
                }
              : comment
          )
        );

      }
    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // handleEdit
  const handleEdit = async (comment, editedContent) => {

    setComments(
      comments.map((c) => 
        c._id === comment._id ? {...c, content:editedContent} : c
      )
    );

  }

  // handleDelete
  const handleDelete = async (commentId) => {

    try
    {
      if(User)
      {
        navigate('/sign-in')

        return ;
      }

      const res = await axios.delete(url + `/api/comment/delete-comment/${commentId}`,{withCredentials:true})

      if(res.data.success)
      {
        setShowModal(false)

        setComments(comments.filter((comment) => comment._id !== commentId))
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  return (

    <div className="w-full py-10">

        

        {User 
            ? 
           (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">

              <p className="">Signed as:</p>

              <img 
                src={User.profilePicture} 
                alt="" 
                className="h-5 w-5 object-cover rounded-full " 
              />

              <Link
                to={`/profile`}
                className="text-xs text-cyan-60 hover:underline"
              >
                @{User.username}
              </Link>

            </div>
           ) 
           : 
           (
            <Link 
                to='/sign-in'
                className="flex flex-col py-10" 
            >
                <button className="flex items-center justify-center bg-white dark:bg-transparent text-black dark:text-gray-500 px-4 py-2 rounded-full font-semibold border border-slate-600 dark:border-slate-300">
                    sign in to comment
                </button>

            </Link>
           )
        }

        {User && (

          <form 
            onSubmit={handleSubmit} 
            className="border border-ammer-500 rounded-md p-3"
          >
              <Textarea
                placeholder='Add a comment'
                rows='3'
                maxLength='500'
                onChange={(e) => setFormData({...formData, content:e.target.value})}
                value={formData.content}
              />

              <div className="flex justify-between items-center mt-5">

                <p className="text-gray-500 text-xs">
                  {500 - formData?.content?.length} characters remaining
                </p>

                <Button
                  type="submit" 
                  gradientDuoTone="pinkToOrange"
                  outline
                >
                  Submit
                </Button>

              </div>

          </form>

        )}

        {comments.length === 0 ? 
          (
            <p className="text-sm my-5">No comments yet! Be the firt one to comment</p>
          )
          :
          (
            <>
               <div className="mt-5">

                  <p className="text-xl font-semibold text-slate-700 dark:text-slate-500 mb-6">
                        Comments ({comments.length})
                  </p>

               </div>

               {
                 comments.map((comment, index) => (
                  <Comments
                      key={index}
                      comment={comment}
                      onLike={handleLike}
                      onEdit={handleEdit}
                      onDelete={(commentId) => {
                        setShowModal(true)
                        setCommentToDelete(commentId)
                      }}
                  />
                 ))
               }
            </>
          )
        }

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >

          <Modal.Header/>

          <Modal.Body>
            
            <div className="text-center">

              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>

              <h2 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure want to delete this comment?
              </h2>

              <div className="flex justify-center gap-4">

                <Button
                  gradientMonochrome="failure"
                  onClick={() => handleDelete(commentToDelete)}
                >
                  Yes, I'm sure
                </Button>

                <Button
                  gradientMonochrome="success"
                  onClick={() => setShowModal(false)}
                >
                  No Cancel
                </Button>

              </div>

            </div>

          </Modal.Body>

        </Modal>

    </div>

  )

}
