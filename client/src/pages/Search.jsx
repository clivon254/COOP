

import axios from 'axios'
import { Button, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import CardLoading from '../components/CardLoading'
import { useContext } from 'react'
import { StoreContext } from '../context/store'

export default function Search() {

  const {url} = useContext(StoreContext)

  const [sidebarData, setSidebardata] = useState({
    searchTerm:"",
    sort:'desc',
    category:'choose an option'
  })

  const [posts, setPosts] = useState([])

  const [Loading, setLoading] = useState(false)

  const [showMore, setShowMore] = useState(false)

  const [loader, setLoader] = useState([{},{},{},{}])

  const location = useLocation()

  const navigate = useNavigate()

  useEffect(() => {

    const urlParams = new URLSearchParams(location.search)

    const searchTermFromUrl = urlParams.get('searchTerm')

    const sortFromUrl = urlParams.get('sort')

    const categoryFromUrl = urlParams.get('category')

    if(searchTermFromUrl || sortFromUrl || categoryFromUrl)
    {
       setSidebardata({
        ...sidebarData,
        searchTerm:searchTermFromUrl,
        sort:sortFromUrl,
        category:categoryFromUrl
       })
    }

    // fetchPost 
    const fetchPosts = async () => {

      setLoading(true)

      try
      {

        const searchQuery = urlParams.toString()

        const res = await axios.get(url + `/api/post/get-posts?${searchQuery}`)

        if(res.data.success)
        {
          setLoading(false)

          setPosts(res.data.posts)

          if(res.data.posts.length === 9)
          {
            setShowMore(true)
          }
          else
          {
            setShowMore(false)
          }

        }

      }
      catch(error)
      {
        console.log(error.message)

        setLoading(false)
      }


    }

    fetchPosts()

  },[location.search])

  // handleChange
  const handleChange = (e) => {

    if(e.target.name === "searchTerm")
    {
      setSidebardata({...sidebarData, searchTerm:e.target.value})
    }

    if(e.target.name === "sort")
    {
      const order = e.target.value || 'desc'

      setSidebardata({...sidebarData, sort:order})
    }

    if(e.target.name === "category")
    {
      const category = e.target.value || 'choose an option'

      setSidebardata({...sidebarData, category})
    }

  }

  // handleSubmit
  const handleSubmit = async () => {

    e.preventDefault()

    const urlParams = new URLSearchParams(location.search)

    urlParams.set('searchTerm', sidebarData.searchTerm)

    urlParams.set('sort', sidebarData.sort)

    urlParams.set('category', sidebarData.category)

    const searchQuery = urlParams.toString()

    navigate(`/search?${searchQuery}`)

  }

  // handleShowMore
  const handleShowMore = async () => {

    const numberOfPosts = posts.length

    const startIndex = numberOfPosts;

    const urlParams = new URLSearchParams(location.search)

    urlParams.set('startIndex', startIndex)

    const searchQuery = urlParams.toString()
    
    try
    {
      const res = await axios.get(url +`/api/post/get-posts?${searchQuery}`)

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

  return (

    <div className="flex flex-col md:flex-row">

      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">

          <form onSubmit={handleSubmit} className="md:flex md:flex-col gap-4 grid grid-cols-2">

            <div className="flex flex-col  gap-2">

              <label className="whitespace-nowrap font-semibold" >
                Search Term:
              </label>

              <TextInput
                placeholder='Search.....'
                name="searchTerm"
                type="text"
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />

            </div>

            <div className="flex flex-col gap-2">

              <label className=" font-semibold" >
                  Sort:
              </label>

              <Select 
                onChange={handleChange}
                value={sidebarData.sort}
                name="sort"
              >
                <option value="desc">Latest</option>

                <option value="asc">Oldest</option>
              </Select>

            </div>

            <div className="flex flex-col gap-2">

              <label className=" font-semibold" >
                  category:
              </label>

              <Select 
                onChange={handleChange}
                value={sidebarData.category}
                name="category"
              >
                <option value="Choose an option">Choose an option</option>

                <option value="Politics">Politics</option>

                <option value="Education">Education</option>

                <option value="Fashion">Fashion</option>

                <option value="Sports">Sports</option>

                <option value="Fun">Fun</option>

              </Select>

            </div>

            <div className="place-self-center">

              <Button
                type="submit"
                gradientDuoTone="purpleToBlue"
              >
                Apply filter
              </Button>

            </div>

          </form>

      </div>

      <div className="w-full">

        <h1 className="text-3xl font-semibold sm:border-b border-gray p-3 mt-5">
          Post results:
        </h1>

        {!Loading && posts.length === 0 && (

          <p className="text-xl text-gray-500 p-3">No posts found</p>

        )}



        {!Loading &&
         posts && (

            <div className="px-5 py-5 ">

              <div className="grid gid-cols-1 lg:grid-cols-2 gap-y-20 gap-x-10">

                {posts.map((post) => <Card key={post._id} post={post}/>) }

              </div>  

            </div>

         )}

        {showMore && (
          
          <button
            onClick={handleShowMore}
            className="text-indigo-500 text-lg hover:underline p-7 w-full"
          >
            Show More
          </button>

        )}

      </div>

    </div>

  )
  
}
