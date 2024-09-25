

import React, { useContext, useEffect, useState } from 'react'
import PopularPosts from '../components/PopularPosts'
import PopularWriter from '../components/PopularWriter'
import { StoreContext } from '../context/store'
import axios from 'axios'

export default function Category() {

    const query = new URLSearchParams(window.location.search).get("category")

    const {popularArticles,popularWriters} = useContext(StoreContext)

    const [posts,setPosts] = useState([])
    
    console.log(posts)

    useEffect(() => {

        // fetchPost
        const fetchPost = async () => {

            try
            {
                const res = await axios.get(`/api/post/get-posts?category=${query}`)

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

        fetchPost()

    },[])

   return (

    <div className="px-5 2xl:px-20">

        <div className="py-5">

            <h2 className="text-4xl 2xl:text-5xl font-semibold text-slate-800 dark:text-white">
                {query}
            </h2>

            <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">

                {/* LEFT */}
                <div className="w-full md:w-2/3 flex flex-col gap-y-28 md:gap-y-14">
                    
                    {posts?.length === 0 ? 
                        (
                            <div className="w-full h-full py-8 flex "></div>
                        ) 
                        :
                        (
                            <></>
                        )
                    }

                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/3 flex flex-col gap-y-12">

                    {/* POPULAR POST */}
                    <PopularPosts posts={popularArticles} />

                    {/* POPULAR POST */}
                    <PopularWriter data={popularWriters} />

                </div>

            </div>

        </div>

    </div>

  )
}
