import React from 'react'
import {DbAddNewItems, DbHeader, DbHome, DbItems, DbOrders, DbUsers} from '../Components'
import { Route,Routes } from 'react-router-dom'

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
      </Routes>
      </div>
    </div>
  )
}

export default DbRightSection