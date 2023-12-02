import React from 'react'
import { useSelector } from 'react-redux'

const DbHeader = () => {
   
    const user = useSelector(state => state.user)

  return (
    <div className='flex w-full items-center justify-between gap-3 -mt-7 px-2'>
      <p className='text-xl font-bold text-headingColor'> Welcome To TastyBites   
      {user?.name && <span>{`  ${user?.name} 😊!`}</span>}
      </p>

     </div>
  )
}

export default DbHeader