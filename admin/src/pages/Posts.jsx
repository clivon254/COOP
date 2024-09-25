

import { Button, Modal, Table } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import clsx from 'clsx'
import { MdEdit, MdViewArray, MdViewCarousel } from 'react-icons/md'
import {FaTrash} from "react-icons/fa"
import {Link} from "react-router-dom"
import { HiOutlineExclamation } from 'react-icons/hi'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {toast } from "sonner"


export default function Posts() {

  const {User} = useSelector(state => state.user)

  const {posts,setPosts,showMore,setShowMore,handleShowMore,Loading} = useContext(StoreContext)

  const [showModal, setShowModal] = useState(false)

  const [postIdToDelete, setPostIdToDelete] = useState(null)

  // handleDelete
  const handleDeletePost = async () => {

    try
    {
      const res = await axios.delete(`/api/post/delete-post/${postIdToDelete}/${User._id}`)

      if(res.data.success)
      {
        setPosts((prev) => 
            prev.filter((post) => post._id !== postIdToDelete)
        )

        setShowModal(false)

        toast.success('post deleted successfully')
      }
      else
      {
        console.log(res.data.message)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  const [Loader, setLoader] = useState([{},{},{},{},{}])

  return (
    <>

      
      <div className="px-5">

        <h1 className="my-7 text-center font-semibold text-3xl">Posts</h1>

          {!Loading && (
            <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

              {posts?.length > 0 ? 
                (
                  <>
                  
                    <Table>

                      <Table.Head>

                        <Table.HeadCell>Dated Updated</Table.HeadCell>

                        <Table.HeadCell>Image</Table.HeadCell>

                        <Table.HeadCell>title</Table.HeadCell>

                        <Table.HeadCell>Category</Table.HeadCell>

                        <Table.HeadCell>status</Table.HeadCell>

                        <Table.HeadCell>Action</Table.HeadCell>

                      </Table.Head>
                      
                        {posts?.map((post,index) => (

                          <Table.Body key={index}>

                            <Table.Row>

                                <Table.Cell>
                                  {new Date(post.updatedAt).toLocaleString()}
                                </Table.Cell>

                                <Table.Cell>
                                  <img 
                                      src={post.image} 
                                      alt={post.title}
                                      className="w-20 h-10"
                                  />
                                </Table.Cell>

                                <Table.Cell>
                                  {post.title}
                                </Table.Cell>

                                <Table.Cell>
                                  {post.category}
                                </Table.Cell>

                                <Table.Cell>
                                  <span className={clsx("px-3 py-2 rounded-full text-xs font-semibold",post.status ? "bg-green-400 text-green-200" :"bg-red-400 text-red-200")}>
                                      {post.status ? "active" : "inactive"}
                                  </span>
                                </Table.Cell>

                                <Table.Cell>

                                  <div className="flex items-center gap-x-3">

                                    <span className="">

                                      <Link to={`/post/${post.slug}`}>

                                          <MdViewArray size={20}/>

                                      </Link>

                                    </span>

                                    <span className="">

                                        <Link to={`/edit-post/${post.slug}`}>

                                            <MdEdit size={20}/>

                                        </Link>

                                    </span>

                                    <span className="cursor-pointer">
                                      <FaTrash 
                                          size={20}
                                          onClick={() => {setShowModal(true)  ; setPostIdToDelete(post._id)}}
                                      />
                                    </span>

                                  </div>

                                </Table.Cell>

                            </Table.Row>

                          </Table.Body>

                        ))}
                    
                    </Table>
                    
                    {showMore && (

                      <button 
                          onClick={handleShowMore}
                          className="w-full text-teal-500 hover:underline"
                      >
                        show more
                      </button>

                    )}

                  </>

                ) 
                : 
                (
                  <p className="text-center text-2xl my-10">No posts yet</p>
                )
              }
        
            </div>
          )}
        
          {Loading && (

            <Table>

              <Table.Head>

                <Table.HeadCell>Dated Updated</Table.HeadCell>

                <Table.HeadCell>Image</Table.HeadCell>

                <Table.HeadCell>title</Table.HeadCell>

                <Table.HeadCell>Category</Table.HeadCell>

                <Table.HeadCell>status</Table.HeadCell>

                <Table.HeadCell>Action</Table.HeadCell>

              </Table.Head>
              
              {Loader.map((loader,index) => (
                  <Table.Body key={index}>

                    <Table.Row className="animate-pulse">

                      <Table.Cell >

                        <div className="bg-gray-400 h-5 w-14 rounded-full "></div>

                      </Table.Cell>

                      <Table.Cell>

                        <div className="bg-gray-400 h-8 w-12 rounded-md "></div>

                      </Table.Cell>

                      <Table.Cell>

                        <div className="bg-gray-400 h-5 w-20 rounded-full "></div>

                      </Table.Cell>

                      <Table.Cell>

                        <div className="bg-gray-400 h-5 w-14 rounded-full "></div>

                      </Table.Cell>

                      <Table.Cell>

                        <div className="bg-gray-400 h-5 w-14 rounded-full "></div>

                      </Table.Cell>

                      <Table.Cell>

                        <div className="bg-gray-400 h-5 w-14 rounded-full "></div>

                      </Table.Cell>

                    </Table.Row>

                </Table.Body>
              ))}
                

            </Table>

          )}

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >

          <Modal.Header/>

          <Modal.Body>

            <div className="text-center ">

              <HiOutlineExclamation className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>

              <h3 className="text-xl font-semibold">Are you sure you want to delete this post</h3>

              <div className="flex justify-center gap-4 mt-4">

                <Button 
                  gradientMonochrome="failure"
                  onClick={handleDeletePost}
                >
                  Yes ,I am sure 
                </Button>

                <Button
                  gradientMonochrome="success"
                  onClick={() => setShowModal(false)}
                >
                  No cancel
                </Button>
              </div>

            </div>

          </Modal.Body>

        </Modal>


      </div>

    </>
  )
  
}
