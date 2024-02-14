import React from 'react'
import { Header } from '../Components'
import AboutUs from '../Components/AboutUs'
import {Cart} from '../Components'
import { useSelector } from 'react-redux'

const About = () => {
  const isCart = useSelector((state) => state.isCart)
  return (
    <div >
      <Header />
      <AboutUs/>
      {isCart && <Cart />}
    </div>
  )
}

export default About