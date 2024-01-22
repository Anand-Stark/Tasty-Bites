import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useSelector } from 'react-redux/es/hooks/useSelector';

export default function ComboBox() {
    const products = useSelector((state) => state.products);
    console.log("inside search bar");

    console.log(products);

    const productsFormatted = products.map((product) => ({
        label: product.prod_name,
        id: product.productId,  
      }));


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={productsFormatted}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Food" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
