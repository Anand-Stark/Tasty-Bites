import React from 'react'
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DbTable = ({columns,data,title,action}) => {
    // selecting the default theme : 

    const theme = createTheme();

  return (
    <div className='w-full border-l-4 border-red-400 border-r-4 '>
        <ThemeProvider  theme={theme}>
        <MaterialTable
         columns={columns}
         data={data}
         title={title}
         actions={action}
        />
      </ThemeProvider>
    </div>
  )
}

export default DbTable