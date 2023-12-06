import React from 'react'
import { Header } from '../Components'
import AboutUs from '../Components/AboutUs'

const About = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <AboutUs/>
    </div>
  )
}

export default About