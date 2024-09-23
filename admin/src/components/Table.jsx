

import { Table } from 'flowbite-react'
import React from 'react'
import { formatNumber } from '../utils'
import moment from "moment"


export const  RecentFollowerTable = ({data}) => {

  return (
    <div className=""></div>
  )

}


export const RecentPostTable = ({data}) => {

   

    return(

      <>
            
       <Table>

         <Table.Head>

           <Table.Head>

             <Table.HeadCell>Post Title</Table.HeadCell>

             <Table.HeadCell>Veiw</Table.HeadCell>

             <Table.HeadCell>Post Date</Table.HeadCell>

           </Table.Head>

           {data.length > 0 ?
            (
              
              data.map((data) => (
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
                    {formatNumber(data?.veiws.length)}
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
              <p className="">
                No posts yet 
              </p>
            )
          }

        </Table.Head>

      </Table>

      </>

    )

}
