

import React from 'react'
import {Navbar,Button,Dropdown,Avatar,Drawer} from "flowbite-react"
import {useSelector,useDispatch} from "react-redux"
import {useNavigate,Link,NavLink} from "react-router-dom"
import Logo from './Logo'
import { useContext,useState,useEffect } from 'react'
import { StoreContext } from '../context/store'
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from 'react-icons/md'
import {toast} from "sonner"
import { signOutSuccess } from '../redux/user/userSlice'
import axios from "axios"
import COOP from "../assets/COOP-IMG.png"
import { toggleTheme } from '../redux/theme/themeSlice'
import DashSidebar from './DashSidebar'



export default function Header() {

  const [isSticky ,setIsSticky] = useState(false)

  const {themes} = useSelector(state => state.theme)

  const {User} = useSelector(state => state.user)

  const {open, setOpen} = useContext(StoreContext)

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

            navigate('/')
        }

    }
    catch(error)
    {
        console.log(error.message)
    }

  }

  useEffect(() => {
   

    let prevScrollPosition = 0;

    const handleScroll = () => {

        const scrollPosition = window.scrollY;

        const scrollDirection = scrollPosition - prevScrollPosition;

        prevScrollPosition = scrollPosition; // Update prevScrollPosition

        if (scrollDirection < 0 && scrollPosition > 0) {
          setIsSticky(true);
        } else if (scrollDirection > 0) {
          setIsSticky(false);
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

return (
    <>

      <Navbar className={`border-b py-5 dark:bg-black ${isSticky ? "sticky top-0":""}`}>

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

        <div className="flex items-center gap-2">

          <img 
            src={COOP} 
            alt="" 
            className="h-12 hidden md:block" 
          />

          <Logo/>

        </div>

        <div className="hidden md:flex items-center gap-x-5 lg:gap-x-12 ">

            <NavLink to="/" className={({isActive}) => isActive ? "active-link":"active"}>Home</NavLink>

            <NavLink to="/search" className={({isActive}) => isActive ? "active-link":"active"}>Search</NavLink>

            <NavLink to="/contact" className={({isActive}) => isActive ? "active-link":"active"}>Contact</NavLink>

            <NavLink to="/about" className={({isActive}) => isActive ? "active-link":"active"}>About</NavLink>

        </div>

        <div className="flex items-center order-2 gap-x-2">
          
        <button 
          className="w-12 h-12 rounded-full hidden md:flex justify-center items-center border"
          onClick={() => dispatch(toggleTheme())}
        >
          {
            themes === 'light' ?
              <MdDarkMode />
                :
              <MdLightMode/>
          }
        </button>

          {User ? 
            (
              <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                      <Avatar 
                          alt='user' 
                          img={User?.profilePicture}
                          rounded
                      />
                  }
              >
                  <Dropdown.Header>

                      <span className="block text-sm">{User.username}</span>

                      <span className="block text-sm fontmedium">{User.email}</span>

                  </Dropdown.Header>

                  <Link to="/profile">

                      <Dropdown.Item>Profile</Dropdown.Item>

                  </Link>

                  {User.accountType === "writer" && (

                    <Link to="/dashboard">

                      <Dropdown.Item>Dashboard</Dropdown.Item>

                    </Link>
                  )}


                  <Dropdown.Divider/>

                  <Dropdown.Item 
                      onClick={handleSignOut}
                  >
                      Sign out
                  </Dropdown.Item>

              </Dropdown>
            ) 
            :
            (
              <Button
                type="button"
                onClick={() => navigate('/sign-in')}
                gradientDuoTone="pinkToOrange"
                pill
              >
                Sign in
              </Button>
            )
          }

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
