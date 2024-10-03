


import React, { createContext, useState,useEffect } from 'react'
import axios from "axios"


export const StoreContext = createContext(null)

export default function StoreContextProvider(props) {

    const url = "http://localhost:800"

    const [token, setToken] = useState("")

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

          const res = await axios.post(url + '/api/post/stats',{},{headers:{token}})

          if(res.data.success)
          {
            setData(res.data)

            setLoading(false)

            setError(false)
          }
          else
          {
            console.log("check the api")
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

        const res = await axios.get(url + "/api/post/get-posts")

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
        const res = await axios.get(url + `/api/post/get-posts?starterIndex=${startIndex}`)

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
        const res = await axios.post(url + '/api/post/popular-content')

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

      function loadData()
      {

        if(localStorage.getItem("token"))
          {
  
            setToken(localStorage.getItem("token"))
  
          }
      }

      loadData()
      

    },[token])

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
      setPopularWriters,
      token,
      setToken
    }

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}
        
    </StoreContext.Provider>

  )

}
