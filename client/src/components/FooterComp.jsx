


import React from 'react'
import {Footer} from "flowbite-react"
import {BsFacebook, BsGithub, BsInstagram, BsTwitter,BsDribbble} from "react-icons/bs"
import {Link} from "react-router-dom"
import Logo from './Logo'
import COOP from "../assets/COOP-IMG.png"


export default function FooterComp() {

  return (
    
    <Footer className="border border-t-4 border-green-500 p-4 dark:bg-black">

      <div className="w-full max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-start gap-y-5 gag-x-10 justify-around ">

              <div className="">

                <Link to="/" className="flex flex-col  items-start sm:items-center">

                    <img 
                      src={COOP} 
                      alt="" 
                      className="h-20" 
                    />

                    <Logo/>

                </Link>

              </div>

              <div className="w-full sm:w-[50%] flex items-start justify-between md:justify-around">

                <div className="">

                  <Footer.Title title="About"/>

                  <Footer.LinkGroup col>

                    <Footer.Link
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get to Know us
                    </Footer.Link>

                  </Footer.LinkGroup>

                </div>

                <div className="">

                  <Footer.Title title="Follow us"/>

                  <Footer.LinkGroup col>

                    <Footer.Link
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get to Know us
                    </Footer.Link>

                    <Footer.Link href="#">Discord</Footer.Link>

                  </Footer.LinkGroup>

                </div>

                <div className="">

                  <Footer.Title title="Legal"/>

                  <Footer.LinkGroup col>

                    <Footer.Link href="#">privacy policy</Footer.Link>

                    <Footer.Link href="#">Terms &amp; conditions</Footer.Link>

                  </Footer.LinkGroup>

                </div>

              </div>

        </div>

        <Footer.Divider/>

        <div className="w-full sm:flex sm:items-center justify-between space-y-4">

            
            <Footer.Copyright 
                href="#"
                by="Clivon Osire"
                year={new Date().getFullYear()}
            />

            <div className="flex gap-x-6 sm:mt-0 sm:justify-center">

              <Footer.Icon href="#" icon={BsFacebook} />

              <Footer.Icon href="#" icon={BsInstagram} />

              <Footer.Icon href="#" icon={BsTwitter} />

              <Footer.Icon href="#https://github.com/clivon254" icon={BsGithub} />

              <Footer.Icon href="#" icon={BsDribbble} />

            </div>
            
        </div>

      </div>

    </Footer>

  )

}
