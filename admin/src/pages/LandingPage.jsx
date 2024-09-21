

import React from 'react'
import clsx from "clsx"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { MdArrowForward } from "react-icons/md"
import { Button } from  "flowbite-react"


export default function LandingPage() {

  const {themes} = useSelector(state => state.theme)
  
  const navigate = useNavigate()


  return (

    <div className={clsx(
      "w-full h-screen px-0 md:px-4",
      themes
         ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff] via-blue-50 to-white"
         : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#302943] via-slate-900 to-black"
        
      )}
    >

      <div className="w-full h-full flex flex-col items-center justify-center gap-y-8 md:gap-y-6 px-4">

        <div className="w-full 2xl:max-w-3xl flex flex-col items-center justify-center gap-y-10 2xl:-mt-20">

            <span
             className={clsx(
              "hidden md:flex gap-2 py-1 px-3 border rounded-full text-sm md:text-base",
              themes
                ? "border-gray-700 text-gray-400"
                :"border-gray-300 text-gray-600"
             )}
            >
              Unleash Your words ,and share with others {" "}

              <Link
                to='/sign-in'
                className={clsx(
                  "flex gap-1 items-center font-semibold text-[18px]",
                  themes ? "text-white" :"text-slate-700"
                )}
              >
                    Join Now

                    <MdArrowForward />

              </Link>

            </span>

            <h1 
              className={clsx(
                `text-4xl 2xl:text-6xl font-bold text-center`,
                themes ? "text-gray-400"
                        :"text-slate-700"
              )}
            >
              Join Our Community of Passionate writers !
            </h1>

            <span 
              className={clsx(
                `text-center text-base md:text-[18px] max-w-2xl`,
                themes ? "text-gray-500" :"text-slate-600"
              )}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              feugiat dolor id lorem rutrum viverra. Vivamus dignissim ipsum
              turpis, non venenatis augue congue.
            </span>

            <div className="flex gap-6 items-center mt-6">

                <Button
                  gradientDuoTone="pinkToOrange"
                  pill
                  onClick={ () => navigate('/sign-in')}
                >
                  Get Started
                </Button>


            </div>

        </div>

      </div>

    </div>

  )

}
