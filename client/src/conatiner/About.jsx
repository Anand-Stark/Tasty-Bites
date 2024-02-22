import React from 'react'
import { Header } from '../Components'
import AboutUs from '../Components/AboutUs'
import {Cart} from '../Components'
import { useSelector } from 'react-redux'
import Footer2 from '../Components/Footer2'

const About = () => {
  const isCart = useSelector((state) => state.isCart)
  return (
    <div >
      <Header />
      <AboutUs/>
      {isCart && <Cart />}
      <Footer2/>
    </div>
  )
}

export default About