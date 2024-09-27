


import React, { createContext, useState,useEffect } from 'react'
import axios from "axios"


export const StoreContext = createContext(null)

export default function StoreContextProvider(props) {

    const url = "https://coop-server.onrender.com"

    const [open ,setOpen] = useState(false)

    const [Loading ,setLoading] = useState(false)

    const [Error ,setError] = useState(false)

    const [data,setData] = useState({})

    const [posts ,setPosts] = useState([])

    const [showMore ,setShowMore] = useState(true)

    const [popularArticles, setPopularArticles] = useState([])

    const [popularWriters, setPopularWriters] = useState([])

    // fetchData
    const fetchData = async () => {

      try
      {
          setLoading(true)

          setError(false)

          const res = await axios.post('/api/post/stats')

          if(res.data.success)
          {
            setData(res.data)

            setLoading(false)

            setError(false)
          }
      }
      catch(error)
      {
        console.log(error)

        setLoading(false)

        setError(true)
      }

    }

    // fetchPosts
    const fetchPosts = async () => {

      try
      {
        setLoading(true)

        setError(false)

        const res = await axios.get("/api/post/get-posts")

        if(res.data.success)
        {
          setLoading(false)

          setError(false)

          setPosts(res.data.posts)

          if(res.data.posts.length < 9)
          {
            setShowMore(false)
          }

        }
        else
        {
          console.log(res.data.message)

          setLoading(false)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setLoading(false)

        setError(true)
      }

    }

    // handleShowMore
    const handleShowMore = async () => {

      const startIndex = posts.length ;

      try
      {
        const res = await axios.get(`/api/post/get-posts?starterIndex=${startIndex}`)

        if(res.data.success)
        {
          setPosts((prev) => [...prev,...res.data.posts])

          if(res.data.posts.length < 9)
          {
            setShowMore(false)
          }
        }
      }
      catch(error)
      {
        console.log(error.message)
      }

    }

    // fetchPopularArticles
    const fetchPopularArticles = async () => {

      try
      {
        const res = await axios.post('/api/post/popular-content')

        if(res.data.success)
        {
          setPopularArticles(res.data.posts)

          setPopularWriters(res.data.writers)
        }

      }
      catch(error)
      {
        console.log(error.message)
      }

    }


    useEffect(() => {

      fetchData()

      fetchPosts()

      fetchPopularArticles()

    },[])

    const contextValue = 
    {
      url,
      open,
      setOpen,
      Loading,
      setLoading,
      data,
      setData,
      posts,
      setPosts,
      showMore,
      setShowMore,
      handleShowMore,
      Error,
      setError,
      popularArticles,
      setPopularArticles,
      popularWriters,
      setPopularWriters
    }

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}
        
    </StoreContext.Provider>

  )

}
