import React from 'react'
import {DbHeader, ProfileHome,ProfileOrders, ProfileReservations} from "../Components"
import { Route,Routes } from 'react-router-dom'
import UsersOrder from './UsersOrder'


const ProfRightSection = () => {
  return (
    <div className='flex flex-1 flex-col py-12 px-12 h-full'>
      <DbHeader/>
      <div className='flex flex-col flex-1 overflow-y-scroll scrollbar-none '>
      <Routes>
         <Route path='/' element={<ProfileHome/>} />
         <Route path='/orders' element={<UsersOrder/>} />
         <Route path='/reservation-list' element={<ProfileReservations/>} />
      </Routes>
      </div>
    </div>
  )
}

export default ProfRightSection