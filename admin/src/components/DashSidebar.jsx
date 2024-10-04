

import { Sidebar } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { Link } from 'react-router-dom'
import { HiChartPie,HiUsers, HiDatabase, HiDocumentAdd,HiOutlineBookOpen } from "react-icons/hi"

export default function DashSidebar() {

  const {open,setOpen} = useContext(StoreContext)

  return (
    
    <Sidebar className="min-h-full w-full">

      <Sidebar.Items>

          <Sidebar.ItemGroup className="flex flex-col  gap-y-4">

              <Link to="/" onClick={() => setOpen(false)}>

                  <Sidebar.Item
                    active={window.location.pathname === '/'}
                    as="div"
                    icon={HiChartPie}
                  >
                    Dashboard
                  </Sidebar.Item>

              </Link>

              <Link to="/add-post" onClick={() => setOpen(false)}>
              
                  <Sidebar.Item
                    active={window.location.pathname === '/add-post'}
                    as="div"
                    icon={HiDocumentAdd}
                  >
                    Add Posts
                  </Sidebar.Item>

              </Link>

              <Link to="/analytics" onClick={() => setOpen(false)}>
              
                  <Sidebar.Item
                    active={window.location.pathname === '/analytics'}
                    as="div"
                    icon={HiDatabase}
                  >
                    Anaylitics
                  </Sidebar.Item>

              </Link>

              <Link to="/users" onClick={() => setOpen(false)}>
              
                <Sidebar.Item
                  active={window.location.pathname === '/users'}
                  as="div"
                  icon={HiUsers}
                >
                  Users
                </Sidebar.Item>

              </Link>

              <Link to="/posts" onClick={() => setOpen(false)}>
              
                  <Sidebar.Item
                    active={window.location.pathname === '/posts'}
                    as="div"
                    icon={HiOutlineBookOpen}
                  >
                   Posts
                  </Sidebar.Item>

              </Link>

          </Sidebar.ItemGroup>

      </Sidebar.Items>

      
    </Sidebar>

  )

}
