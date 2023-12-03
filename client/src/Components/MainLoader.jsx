import React from "react";
import { spiral } from "ldrs";

import { grid } from "ldrs";
import { dotStream } from 'ldrs'

dotStream.register()

// Default values shown

const MainLoader = () => {
  grid.register();

  return (
    // Default values shown
<l-dot-stream
  size="80"
  speed="2.5" 
  color="orange" 
></l-dot-stream>
   
  );
};

export default MainLoader;
