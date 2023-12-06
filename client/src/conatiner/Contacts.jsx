import React from 'react'
import { Header } from '../Components'
import Contact from '../Components/Contact'

const Contacts = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <Contact/>
    </div>
  )
}

export default Contacts