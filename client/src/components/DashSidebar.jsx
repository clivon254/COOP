


import React from 'react'
import {Sidebar} from "flowbite-react"
import { useContext } from 'react'
import { StoreContext } from '../context/store'
import {HiHome,HiSearch,HiPhone,HiAdjustments,HiChartPie,HiDocumentAdd,HiDatabase,HiOutlineBookmark} from "react-icons/hi"
import {MdDarkMode,MdLightMode} from "react-icons/md"
import { toggleTheme } from '../redux/theme/themeSlice'
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"


export default function DashSidebar() {
  
  const {open,setOpen} = useContext(StoreContext)
  
  const {themes} = useSelector(state => state.theme)

  const {User} = useSelector(state => state.user)

  const dispatch = useDispatch()

  return (

    <Sidebar>

        <Sidebar.Items>

            <Sidebar.ItemGroup className="flex flex-col gap-y-4">

                <Link 
                  to="/"
                  onClick={() => setOpen(false)}
                >
                    <Sidebar.Item
                        active={window.location.pathname === '/'}
                        as="div"
                        icon={HiHome}
                    >
                        Home
                    </Sidebar.Item>

                </Link>

                <Link 
                  to="/search"
                  onClick={() => setOpen(false)}
                >
                    <Sidebar.Item
                        active={window.location.pathname === '/search'}
                        as="div"
                        icon={HiSearch}
                    >
                        Search
                    </Sidebar.Item>
                    
                </Link>

                <Link 
                  to="/contact"
                  onClick={() => setOpen(false)}
                >
                    <Sidebar.Item
                        active={window.location.pathname === '/contact'}
                        as="div"
                        icon={HiPhone}
                    >
                       Contact
                    </Sidebar.Item>
                    
                </Link>

                <Link 
                  to="/about"
                  onClick={() => setOpen(false)}
                >
                    <Sidebar.Item
                        active={window.location.pathname === '/about'}
                        as="div"
                        icon={HiAdjustments}
                    >
                       About
                    </Sidebar.Item>
                    
                </Link>

                {User?.accountType === "writer" && (

                    <Link 
                        to="/dashboard"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/dashboard'}
                            as="div"
                            icon={HiChartPie}
                        >
                            Dashboard
                        </Sidebar.Item>
                    
                   </Link>
                 )}

                {User?.accountType === "writer" && (

                    <Link 
                        to="/posts"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/posts'}
                            as="div"
                            icon={HiOutlineBookmark}
                        >
                            Posts
                        </Sidebar.Item>
                    
                   </Link>
                 )}

                {User?.accountType === "writer" && (

                    <Link 
                        to="/add-post"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-post'}
                            as="div"
                            icon={HiDocumentAdd}
                        >
                            Add post
                        </Sidebar.Item>
                    
                   </Link>
                 )}

                {User?.accountType === "writer" && (

                    <Link 
                        to="/analytics"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/analytics'}
                            as="div"
                            icon={HiDatabase}
                        >
                            Analytics
                        </Sidebar.Item>
                    
                   </Link>
                 )}

                <Sidebar.Item
                    as="div"
                >
                      <button 
                        className="w-12 h-12 rounded-full flex justify-center items-center border"
                        onClick={() => dispatch(toggleTheme())}
                     >
                        {
                            themes === 'light' ?
                            <MdDarkMode />
                                :
                            <MdLightMode/>
                        } 
                      </button>
                </Sidebar.Item>

            </Sidebar.ItemGroup>

        </Sidebar.Items>

    </Sidebar>

  )

}
