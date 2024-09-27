

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatNumber } from '../utils'
import PopularPosts from '../components/PopularPosts'
import PopularWriter from '../components/PopularWriter'
import { StoreContext } from '../context/store'
import Card from '../components/Card'
import { useSelector } from 'react-redux'
import { Alert, Button } from 'flowbite-react'



export default function WriterPage() {

  const {User} = useSelector(state => state.user)

  const {writerId} = useParams()

  const [user ,setUser] = useState({})

  const [posts ,setPosts] = useState([])

  const [followUpdate, setFollowUpdate] = useState(null)

  const {popularArticles, popularWriters} = useContext(StoreContext)

 const followerIds = user?.followers?.map((f) => f?.followerId?._id)

 
    // fetchUser
    const fetchUser = async () => {

      try
      {
          const res = await axios.get(`/api/user/get-user/${writerId}`)

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

    // fetchPost
    const fetchPosts = async () => {

      try
      {
        const res = await axios.get(`/api/post/get-posts?userId=${writerId}`)

        if(res.data.success)
        {
          setPosts(res.data.posts)
        }

      }
      catch(error)
      {
        console.log(error.message)
      }

    }


   useEffect(() => {

    fetchUser()

    fetchPosts()

  },[writerId])


  // handleFollow
  const handleFollow = async () => {

    try
    {
      
      console.log('hey')

      const res = await axios.post(`/api/user/follow-writer/${user._id}`)

      if(res.data.success)
      {
        setFollowUpdate(res.data.message)

        fetchUser()
      }
      else{
        console.log(res.data.message)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // handleUnFollow 
  const handleUnFollow = async () => {

    try
    {

      const res = await axios.post(`/api/user/unfollow-writer/${user._id}`)

      if(res.data.success)
      {
        setFollowUpdate(res.data.message)

        fetchUser()
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  return (

    <div className="px-5 py-5 2xl:px-20">

      <div className="w-full md:h-60 flex flex-col gap-5 items-center md:flex-row bg-black dark:bg-gradient-to-r from-[#020b19] vai-[#071b3e] to-[#020b19] mt-5 mb-10 rounded-md p-5 md:px-20">

          <img 
            src={user?.profilePicture}
            alt="writer" 
            className="w-48 h-48 rounded-full border-4 border-slate-400 object-cover" 
          />

          <div className="w-full h-full flex flex-col gap-y-5 md:gap-y-8 items-center justify-center">

            <h2 className="text-4xl 2xl:text-5cl font-bold">{user?.username}</h2>

            <div className="flex gap-10">

              {/* followers */}
              <div className="flex flex-col items-center">

                <p className="text-gray-300 text-2xl font-semibold">
                  {formatNumber(user?.followers?.length ?? 0)}
                </p>

                <span className="text-gray-500">Followers</span>

              </div>

              {/* posts */}
              <div className="flex flex-col items-center">

                <p className="text-gray-300 text-2xl font-semibold">
                  {formatNumber(posts?.length ?? 0)}
                </p>

                <span className="text-gray-500">Posts</span>

              </div>

              
              {User && (

                <div className="">
                  {!followerIds?.includes(User?._id) ? 
                    (
                      <Button
                          gradientMonochrome="failure"
                          pill
                          onClick={handleFollow}
                      >
                        Follow
                      </Button>
                    ) 
                    :
                    (
                      <Button
                        gradientMonochrome="failure"
                        pill
                        onClick={handleUnFollow}
                      >
                        Following
                      </Button>
                    )
                    }
                </div>

              )}

            </div>

            <div className="">
              {followUpdate && (

                <Alert>{followUpdate}</Alert>

              )}
            </div>

          </div>

      </div>

      <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">

        {/* LEFT */}
        <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
            {posts.length === 0 ? 
              (

                <div className="w-full h-full py-8 flex justify-center">

                  <span className="text-lg text-slate-500 font-bold">No Post Available</span>

                </div>

              ) 
              : 
              (
                <>
                    {posts?.map((post,index) => (

                      <Card key={post?._id + index} post={post} />

                    ))}
                </>
              )
            }
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/3 flex flex-col gap-y-12">

          {/* POPULAR POST */}
          <PopularPosts posts={popularArticles}/>

          {/* POPULAR WRITERS */}
          <PopularWriter data={popularWriters}/>

        </div>

      </div>

    </div>

  )
}
