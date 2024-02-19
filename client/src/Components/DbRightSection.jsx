import React from 'react'
import {DbAddNewItems, DbHeader, DbHome, DbItems, DbOrders, DbUsers,DbReservationList} from '../Components'
import { Route,Routes } from 'react-router-dom'
import DbDeliveryAgents from './DbDeliveryAgents'


const DbRightSection = () => {
  return (
    <div className='flex flex-1 flex-col py-12 px-12 h-full'>
      <DbHeader/>
      <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none '>
      <Routes>
         <Route path='/home' element={<DbHome/>} />
         <Route path='/orders' element={<DbOrders/>} />
         <Route path='/items' element={<DbItems/>}/>
         <Route path='/newItem' element={<DbAddNewItems/>} />
         <Route path='/users' element={<DbUsers/>}/>
         <Route path='/delivery-agents' element={<DbDeliveryAgents/>} />
         <Route path='/reservation-list' element={<DbReservationList/>} />
      </Routes>
      </div>
    </div>
  )
}

export default DbRightSection