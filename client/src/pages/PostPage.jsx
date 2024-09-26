

import axios from 'axios'
import { Spinner } from 'flowbite-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CommentSection from '../components/CommentSection'
import PopularPosts from '../components/PopularPosts'
import { StoreContext } from '../context/store'
import PopularWriter from '../components/PopularWriter'
import { useSelector } from 'react-redux'

export default function PostPage() {

  const {User} = useSelector(state => state.user)

  const {slug} = useParams()

  const [Loading, setLoading] = useState(false)

  const [error, setError] = useState(false)

  const [post , setPost] = useState(null)

  const {popularArticles,popularWriters} = useContext(StoreContext)

  const [form,setForm] = useState({
    userId:User?._id
  })


  useEffect(() => {

    if(slug)
    {
      window.scrollTo({top:0 ,left:0 ,behavior:"smooth"})
    }

    // fetchPost
    const fetchPost = async () => {

      try
      {
        setLoading(true)

        setError(false)

        const res = await axios.post(`/api/post/get-post/${slug}`,form)

        if(res.data.success)
        {
          setLoading(false)

          setPost(res.data.post)

          setError(false)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setError(true)
      }

    }
    
    fetchPost()

  },[slug])

  return (

    <>

      {!Loading && error && (

        <div className="max-w-64 mx-auto space-y-3 mt-20">

            <span className="block text-center text-xl font-semibold dark:text-white">
                Connection failed!
            </span>

            <span className="block text-center text-xs">
                Check your connection to the internet and try again
            </span>

            <span className="block border w-3/5 py-2 rounded-full text-center mx-auto">
                Retry
            </span>

        </div>

      )}

      {Loading && !error &&(

        <div className="text-center text-xl font-semibold my-7">

          <Spinner/> Loading ....

        </div>

      )}

      {!Loading && !error &&(

        <div className="w-full px-5 md:px-10 py-8 2xl:px-20">
          
          {/* top */}
          <div className="w-full flex flex-col-reverse md:flex-row gap-2 gap-y-5 items-center ">

            <div className="w-full md:w-1/2 flex flex-col gap-y-8">

              <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
                {post?.title}
              </h1>

              <div className="w-full flex item-center">

                <span className="flex-1 text-rose font-semibold text-slate-800 dark:text-white">
                  {post?.category}
                </span>

                <span className="flex flex-1 items-baseline text-2xl font-medium text-slate-700 dark:text-gray-400">
                  {post?.veiw?.length}
                  <span className="text-base text-rose-600">Views</span>
                </span>

              </div>

              <Link to={`/writer/${post?.userId?._id}`} className="flex gap-3">

                <img 
                  src={post?.userId?.profilePicture}
                  alt={post?.userId?.username}
                  className="object-cover w-12 h-12 rounded-full" 
                />

                <div className="">

                  <p className="text-slate-800 dark:text-white font-medium">
                      {post?.userId?.username}
                  </p>

                  <span className="text-slate-600">
                    {new Date(post?.createdAt).toDateString()}
                  </span>

                </div>

              </Link>

            </div>

            <img 
              src={post?.image}
              alt={post?.title}
              className="w-full md:w-1/2 h-auto md:h-[360px] 2xl:h-[460px] rounded object-contain" 
            />

          </div>

          {/* bottom */}
          <div className="w-full flex flex-col md:flex-row gap-x-10 2xl:gap-x-28 mt-10">

            {/* LEFT */}
            <div className="w-full md:w-2/3 flex flex-col text-black dark:text-gray-500">

              {post?.description && (

                <div className="w-full">

                  <div className="flex justify-between p-3 border-slate-500 max-auto max-w-2xl text-xs">

                    <span className="">
                      {new Date(post?.createdAt).toLocaleDateString()}
                    </span>

                    <span className="italic">
                      {(post?.description?.length/1000).toFixed(0)} mins read
                    </span>
                  </div>
                  
                  <div className="p-3 max-w-2xl mx-auto w-full post-content"
                    dangerouslySetInnerHTML={{ __html: post?.description }}
                  />

                </div>
              )}

              <CommentSection postId={post?._id}/>

            </div>

            {/* RIGHT */}
            <div className="w-full md:w-1/3 flex flex-col gap-y-12">

              {/* POPULAR POSTS */}
              <PopularPosts posts={popularArticles}/>
              
              {/* POPULAR WRITERS */}
              <PopularWriter data={popularWriters}/>

            </div>

          </div>

        </div>
        
      )}

    </>
    
  )
}
