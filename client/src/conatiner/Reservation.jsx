import React from 'react'
import { Cart } from '../Components'
import { useSelector } from 'react-redux'
import {Header,Reserve} from '../Components'
import Footer2 from '../Components/Footer2'

const Reservation = () => {
    const isCart = useSelector((state) => state.isCart)

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
    <Header />
    <div className="w-full flex flex-col items-start justify-center 2xl:px-96 gap-12">
      <Reserve/>
      {/* <Home />
      <HomeSLider />
      <FilterSection /> */}
    </div>
    
    <Footer2 />
    {isCart && <Cart />}
  </main>
  )
}

export default Reservation