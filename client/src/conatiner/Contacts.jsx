import React from 'react'
import { Header } from '../Components'
import Contact from '../Components/Contact'
import {Cart} from '../Components'
import { useSelector } from 'react-redux'
import Footer2 from '../Components/Footer2'

const Contacts = () => {

  const isCart = useSelector((state) => state.isCart)

  return (
    <div className='w-full'>
      <Header />
      <Contact/>
      {isCart && <Cart />}
      <Footer2/>
    </div>
  )
}

export default Contacts