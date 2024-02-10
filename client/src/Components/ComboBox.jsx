// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect, useState } from 'react';

// export default function ComboBox() {
//     const products = useSelector((state) => state.products);

//     const productsFormatted = products?.map((product) => ({
//         label: product.prod_name,
//         id: product.productId,  
//       }));


//   return (
//     <Autocomplete
//       className='ml-10 bg-white rounded-lg outline-none border-none   '  
//       disablePortal
//       id="combo-box-demo"
//       options={productsFormatted}
//       sx={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Food" />}
//     />
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

// const ComboBox = () => {
//   const products = useSelector((state) => state.products);
//   const [searchItem, setSearchItem] = useState("");

//   // Check if products is null or undefined before rendering
//   if (!products) {
//     return null; // Or you can render a loading indicator or a message
//   }

//   const items = products.map((product) => product.prod_name);

//   const filteredFoodItems = items.filter((item) =>
//     item.toLowerCase().includes(searchItem.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="p-4">
//         <input
//           type="text"
//           placeholder="Search food items..."
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//           value={searchItem}
//           onChange={(e) => setSearchItem(e.target.value)}
//         />
//         <ul className="mt-2">
//           {filteredFoodItems.map((item, index) => (
//             <li key={index} className="py-1">
//               {item}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ComboBox;

// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';


// export default function ComboBox() {
//     const products = useSelector((state) => state.products);

//     const productsFormatted = products?.map((product) => ({
//         label: product.prod_name,
//         id: product.productId,  
//       }));


//   return (
//     <Autocomplete
//       className='ml-10 bg-white rounded-lg outline-none border-none   '  
//       disablePortal
//       id="combo-box-demo"
//       options={productsFormatted}
//       sx={{ width: 300 }}
//       renderInput={(params) => <TextField {...params} label="Food" />}
//     />
//   );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const ComboBox = () => {
  const products = useSelector((state) => state.products);
  const [searchItem, setSearchItem] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if products is null or undefined before rendering
  if (!products) {
    return null; // Or you can render a loading indicator or a message
  }

  const items = products.map((product) => ({
    name: product.prod_name,
    image: product.prod_image
  }));

  const filteredFoodItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
    setShowDropdown(true);
  };

  const handleItemClick = (item) => {
    setSearchItem(item.name);
    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <div className="px-10 py-1 relative">
        <input
          type="text"
          placeholder="Search food items..."
          className="py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          value={searchItem}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        {showDropdown && (
          <ul className="absolute top-full left-5 w-[80%] bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredFoodItems.map((item, index) => (
              <li
                key={index}
                className="px-2 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-4"
                onClick={() => handleItemClick(item)}
              >
                <img
                  className="w-10"
                  src={item.image}
                  alt="Food"
                />
                <p className="text-md font-bold">{item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
