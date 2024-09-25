


import React from 'react'
import Banner from '../components/Banner'
import PopularWriter from '../components/PopularWriter'
import PopularPosts from '../components/PopularPosts'
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import Card from '../components/Card'
import {GiClothes} from "react-icons/gi"
import {MdOutlineSportsHandball,MdCastForEducation} from "react-icons/md"
import {BsNewspaper,BsCodeSlash} from "react-icons/bs"
import { Link } from 'react-router-dom'


export default function HomePage() {
    
  const {posts,popularArticles,popularWriters} = useContext(StoreContext)

  const randomIndex = Math.floor(Math.random() * posts.length);

 const CATEGORIES = [
    {
      label: "Politics",
      color: "bg-[#e11d48]",
      text: "text-[#fff]",
      icon: <BsNewspaper />,
    },
    {
      label: "Sports",
      color: "bg-[#2563eb]",
      icon: <MdOutlineSportsHandball />,
    },
    {
      label: "Education",
      color: "bg-[#ca8a04]",
      icon: <MdCastForEducation/>,
    },
    {
      label: "Fashion",
      color: "bg-[#9333ea]",
      icon: <GiClothes />,
    },
    {
      label: "Gossip",
      color: "bg-[#000000]",
      icon: <BsCodeSlash />,
    },
  ];
  return (

    <div className="w-full py-10 2xl:py-5">

      <Banner post={posts[randomIndex]}/>

      <div className="px-5 lg:px-10  2xl:px-20">

        {/* categories */}
        <div className="mt-6 md:mt-0">

          <p className="text-2xl font-semibold text-gray-600 dark:text-white"></p>

          <div className="w-full flex flex-wrap py-10 gap-8">
              {CATEGORIES?.map((cat) => (

                <Link 
                  to={`/category?category=${cat?.label}`}
                  className={`flex items-center justify-center gap-3 ${cat.color} text-white text-base px-4 py-2 rounded cursor-pointer`}
                  key={cat.label}
                >
                  {cat.icon}
                  <span className="">{cat.label}</span>
                </Link>

              ))}
          </div>

        </div>

        {/* Blog Post */}
        <div className="w-full flex flex-col md:flex-row gap-10 2xl:gap-20">

          {/* LEFT */}
          <div className="w-full md:w-2/3 flex flex-col gap-y-8">

            {posts?.map((post,index) => (

              <Card key={post?._id} post={post} index={index}/>

            ))}

          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/3 flex flex-col gap-y-12">

            {/* POLPULAR POSTS */}
            <PopularPosts posts={popularArticles}/>

            {/* POPULAR WRITERS */}
            <PopularWriter data={popularWriters}/>

          </div>

        </div>

      </div>

    </div>

  )

}
