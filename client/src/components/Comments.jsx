



import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from "moment"
import axios from 'axios'
import { FaThumbsUp } from 'react-icons/fa'
import { Button, Textarea, TextInput } from 'flowbite-react'
import { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function Comments({comment,onLike,onEdit,onDelete}) {
    
    const {url} = useContext(StoreContext)

    const [user, setUser] = useState({})

    const [isEditing ,setIsEditing] = useState(false)

    const [editedContent ,setEditedContent] = useState(comment.content)

    const {User} = useSelector(state => state.user)


    useEffect(() => {

        const getUser = async () => {

            try
            {
                const res = await axios.get(url + `/api/user/get-user/${comment.userId}`)

                if(res.data.success)
                {
                    setUser(res.data.rest)
                }

            }
            catch(error)
            {
                console.log(error.message)
            }
        }
        
        getUser()

    },[])

    // handleEdit
    const handleEdit = () => {

        setIsEditing(true)

        setEditedContent(comment.content)
    }

    // handleSave
    const handleSave = async () => {

        try
        {
            const res = await fetch(url + `/api/comment/editComment/${comment._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application'
                },
                body:JSON.stringify({
                    content:editedContent
                })
            })

            if(res.ok)
            {
                setIsEditing(false)
                onEdit(comment, editedContent)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    return (

      <div className="flex p-4 border-b dark:border-gray-600 text-sm">

        <div className="flex-shrink-0 mr-3">

            <img 
                src={user.profilePicture}
                alt={user.username}
                className="w-10 h-10 rounded-full bg-gray-200" 
            />

        </div>

        <div className="flex-1">
            
            <div className="flex items-center mb-1">

                <span className="font-bold mr-1 text-xs truncate ">
                    {user ? `@${user.username}`:`anonymous user`}
                </span>

                <span className="text-gray-500 text-xs">
                    {moment(comment.createdAt).fromNow()}
                </span>

            </div>

            {isEditing ? 
                (
                    <>
                        <Textarea
                            className="mb-2"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />

                        <div className="flex justify-end gap-2 text-xs">

                            <Button
                                type="button"
                                size='sm'
                                gradientDuoTone="purpleToBlue"
                                onClick={handleSave}
                            >
                                Save
                            </Button>

                            <Button
                                type="button"
                                size='sm'
                                gradientDuoTone="purpleToBlue"
                                onClick={() => setIsEditing(false)}
                                outline
                            >
                              cancel
                            </Button>

                        </div>
                        
                    </>
                ) 
                : 
                (
                    <>
                        <p className="text-gray-500 pb-2">{comment.content}</p>

                        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">

                            <button 
                                type="button"
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400 hover:text-blue-500 ${
                                    User && 
                                    comment.likes.includes(User._id) && '!text-blue-500'
                                }`}
                            >

                                <FaThumbsUp/>

                            </button>

                            <p className="text-gray-400">
                                {comment.numberOfLikes > 0 && 
                                    comment.numberOfLikes +
                                    ' ' +
                                    (comment.numberOfLikes === 1 ? 'like' : 'likes')
                                }
                            </p>

                            {User && (User._id === comment.userId || User.isAdmin) && (

                                <>
                                    <button 
                                        type="button"
                                        onClick={handleEdit}
                                        className="text-gray-400 hover:text-blue-500"
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        type="button"
                                        onClick={() => onDelete(comment._id)}
                                        className="text-gray-400 hover:text-red-500"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) }

                        </div>
                    </>
                )
            }

        </div>

      </div>

    )
}
