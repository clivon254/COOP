


import { Avatar, Drawer, Dropdown, DropdownHeader, Navbar } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from './Logo'
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'sonner'
import { signOutSuccess } from '../redux/user/userSlice'
import { toggleTheme } from '../redux/theme/themeSlice'
import { StoreContext } from '../context/store'
import DashSidebar from './DashSidebar'


export default function Header() {

    const {open,setOpen} = useContext(StoreContext)

    const {User} = useSelector(state => state.user)

    const {themes} = useSelector(state => state.theme)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    // handleSignOut
    const handleSignOut = async () => {

        try
        {
            const res = await axios.post('/api/auth/sign-out')

            if(res.data.success)
            {
                dispatch(signOutSuccess())

                toast.success('signed out successfully')

                navigate('/landing-page')
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

  return (

    <>

        <Navbar className="py-3 border-b dark:border-slate-800 dark:bg-black shadow-md">

            <div className="md:hidden">
                {
                    open ?
                    <MdClose 
                        size={25} 
                        onClick={() => setOpen(false)}
                        className="cursor-pointer"
                    />
                    :
                    <MdMenu 
                        size={25} 
                        onClick={() => setOpen(true)}
                        className="cursor-pointer"
                    />
                }
            </div>

            <div className="">

                <Logo/>

            </div>

            <div className="flex items-center order-2 gap-x-2">

                <button 
                    className="w-12 h-10 rounded-full flex justify-center items-center border"
                    onClick={() => dispatch(toggleTheme())}
                >
                    {
                        themes === 'light' ?
                            <MdDarkMode />
                        :
                            <MdLightMode/>
                    }
                </button>

                {User && (

                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar 
                                alt='user' 
                                img={User.profilePicture}
                                rounded
                            />
                        }
                    >
                        <DropdownHeader>

                            <span className="block text-sm">{User.username}</span>

                            <span className="block text-sm fontmedium">{User.email}</span>

                        </DropdownHeader>

                        <Link to="/profile">

                            <Dropdown.Item>Profile</Dropdown.Item>

                        </Link>

                        <Dropdown.Divider/>

                        <Dropdown.Item 
                            onClick={handleSignOut}
                        >
                            Sign out
                        </Dropdown.Item>

                    </Dropdown>

                )}
            </div>

        </Navbar>

        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            className="md:hidden"
        >
            <Drawer.Header titleIcon={() => <></>}/>

            <Drawer.Items>

                <DashSidebar/>

            </Drawer.Items>
            
        </Drawer>

    </>
  )

}
