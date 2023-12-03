import React from 'react'
import { dotSpinner } from 'ldrs'

dotSpinner.register()

const SpinnerOk = () => {
  return (
    <div><l-dot-spinner
    size="40"
    speed="0.9" 
    color="orange" 
  ></l-dot-spinner></div>
  )
}

export default SpinnerOk