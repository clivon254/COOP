

import { Table } from 'flowbite-react'
import React from 'react'
import { formatNumber } from '../utils'
import moment from "moment"


export const  RecentFollowerTable = ({data}) => {

  return (

    <>

    <Table>

      <Table.Head>

        <Table.HeadCell>Follower</Table.HeadCell>

        <Table.HeadCell>Join Date</Table.HeadCell>

      </Table.Head>

      {data?.length > 0 ?
        (
          <>

            {data?.map((follower,index) => (

              <Table.Body>

                <Table.Row>

                  <Table.Cell className="">
                    
                    <div className="flex gap-2 items-center">

                        <img 
                          src={follower?.followerId?.profilePicture} 
                          alt={follower?.followerId?.username} 
                          className="w-10 h-10 rounded-full object-cover" 
                        />

                        <>
                          <p className="text-base">{follower?.followerId?.username}</p>

                          <div className="flex gap-3 items-center">

                            <span className="text-sm text-rose-600">
                              {follower?.followerId?.accountType}
                            </span>

                            {follower?.followerId?.followers.length > 0 && (

                              <span className="text-sm to-slate-600 font-bold">
                                {formatNumber(follower?.followerId?.followers.length)}
                              </span>

                            )}

                          </div>
                        </>
                    
                    </div>

                  </Table.Cell>

                  <Table.Cell>
                    {moment(follower.createdAt).fromNow()}
                  </Table.Cell>

                </Table.Row>

              </Table.Body>

              ))}
          </>
        )
         :
        (
          <p className="text-center font-semibold">No Followers yet</p>
        )
      }

    
    </Table>

    </>

  )

}


export const RecentPostTable = ({data}) => {

   
    return(

      <>
            
       <Table>

           <Table.Head>

             <Table.HeadCell>Post Title</Table.HeadCell>

             <Table.HeadCell>Veiw</Table.HeadCell>

             <Table.HeadCell>Post Date</Table.HeadCell>

           </Table.Head>

           {data?.length > 0 ?
            (
              
              data?.map((data) => (
                  <Table.Body>
                    
                    <Table.Row>

                      <Table.Cell>

                          <img 
                            src={data?.image}
                            alt="" 
                            className="w-10 h-10 rounded-full object-cover" 
                          />
            
                      </Table.Cell>

                      <Table.Cell>
                        {formatNumber(data?.veiw?.length)}
                      </Table.Cell>

                      <Table.Cell>
                        {moment(data?.createdAt).fromNow()}
                      </Table.Cell>

                    </Table.Row>

                  </Table.Body>
              ))
           
            )
            :
            (
              <p className="text-center font-semibold w">
                No posts yet 
              </p>
            )
          }

      </Table>

      </>

    )

}
