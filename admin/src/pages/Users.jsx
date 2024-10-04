

import React from 'react'
import {Table,Modal,Button} from "flowbite-react"
import { useContext ,useState} from 'react'
import { StoreContext } from '../context/store'
import {useSelector} from "react-redux"
import { HiOutlineExclamation, } from 'react-icons/hi'
import {Link} from "react-router-dom"
import {MdEdit} from "react-icons/md"
import {FaTrash} from "react-icons/fa"
import axios from "axios"



export default function Users() {

  const {User} = useSelector(state => state.user)

  const {users,Loading,url,token} = useContext(StoreContext)

  const [userIdToDelete, setUserIdToDelete] = useState(null)

  const [showModal, setShowModal] = useState(false)

  // handleDelete
  const handleDeleteUser = async () => {

    try
    {
      const res = await axios.delete(url + `/api/post/delete-user/${userIdToDelete}/${User._id}`,{headers:{token}})

      if(res.data.success)
      {

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

    <div className="px-5">

        <h1 className="my-7 text-center font-semibold text-3xl">User</h1>

          {!Loading && (
            <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">

              {users?.length > 0 ? 
                (
                  <>
                  
                    <Table>

                      <Table.Head>

                        <Table.HeadCell></Table.HeadCell>
                        
                        <Table.HeadCell>Dated joined</Table.HeadCell>

                        <Table.HeadCell>Image</Table.HeadCell>

                        <Table.HeadCell>Name</Table.HeadCell>

                        <Table.HeadCell>Account Type</Table.HeadCell>

                        <Table.HeadCell>Action</Table.HeadCell>

                      </Table.Head>
                      
                        {users?.map((post,index) => (

                          <Table.Body key={index}>

                            <Table.Row>

                               <Table.Cell>{index +1}.</Table.Cell>

                                <Table.Cell>
                                  {new Date(post.updatedAt).toLocaleString()}
                                </Table.Cell>

                                <Table.Cell>
                                  <img 
                                      src={post.profilePicture} 
                                      alt={post.username}
                                      className="w-20 h-20 rounded-full"
                                  />
                                </Table.Cell>

                                <Table.Cell>
                                  {post.username}
                                </Table.Cell>

                                <Table.Cell>
                                  {post.accountType}
                                </Table.Cell>


                                <Table.Cell>

                                  <div className="flex items-center gap-x-3">

                                    <span className="">

                                        <Link to={`/editProfile/${post._id}`}>

                                            <MdEdit size={20}/>

                                        </Link>

                                    </span>

                                    <span className="cursor-pointer">
                                      <FaTrash 
                                          size={20}
                                          onClick={() => {setShowModal(true)  ; setUserIdToDelete(post._id)}}
                                      />
                                    </span>

                                  </div>

                                </Table.Cell>

                            </Table.Row>

                          </Table.Body>

                        ))}
                    
                    </Table>
                    

                  </>

                ) 
                : 
                (
                  <p className="text-center text-2xl my-10">No User yet</p>
                )
              }
        
            </div>
          )}
        
          {Loading && (

            <Table> 

              <Table.Head>

                <Table.HeadCell></Table.HeadCell>

                <Table.HeadCell>Dated joined</Table.HeadCell>

                <Table.HeadCell>Image</Table.HeadCell>

                <Table.HeadCell>Name</Table.HeadCell>

                <Table.HeadCell>Account Type</Table.HeadCell>

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

              <h3 className="text-xl font-semibold">Are you sure you want to delete this User</h3>

              <div className="flex justify-center gap-4 mt-4">

                <Button 
                  gradientMonochrome="failure"
                  onClick={handleDeleteUser}
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

  )
  
}
