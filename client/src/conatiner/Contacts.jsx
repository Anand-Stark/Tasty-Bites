import React from 'react'
import { Header } from '../Components'
import Contact from '../Components/Contact'
import {Cart} from '../Components'
import { useSelector } from 'react-redux'

const Contacts = () => {

  const isCart = useSelector((state) => state.isCart)

  return (
    <div className='w-full'>
      <Header />
      <Contact/>
      {isCart && <Cart />}
    </div>
  )
}

export default Contacts