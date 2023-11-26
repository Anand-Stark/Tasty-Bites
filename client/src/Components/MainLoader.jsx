import React from "react";


import { tailChase } from 'ldrs'

const MainLoader = () => {
  tailChase.register()
  return (
    <l-tail-chase
    size="80"
    speed="1.75" 
    color="orange" 
  ></l-tail-chase>
 );
};

export default MainLoader;
