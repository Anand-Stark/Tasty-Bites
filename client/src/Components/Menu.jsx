// Menu.js

import React from "react";
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";


const Menuitems = ({ prod_name, prod_category, prod_price,  prod_image, productId }) => (
  <>
    <div
      key={productId}
      className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
    >
      <div className="w-full flex items-center justify-between">
        <motion.div
          className="w-40 h-40 -mt-8 drop-shadow-2xl"
          whileHover={{ scale: 1.2 }}
        >
          <img
            src={prod_image}
            alt=""
            className="w-full h-full object-contain rounded-lg"
          />
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
          // onClick={() => setitemss([...cartitemss, items])}
        >
          <MdShoppingBasket className="text-white" />
        </motion.div>
      </div>

      <div className="w-full flex flex-col items-end justify-end -mt-8">
        <p className="text-textColor font-semibold text-base md:text-lg">
          {prod_name}
        </p>
        {/* <p className="mt-1 text-sm text-gray-500">{calories} Calories</p> */}
        <div className="flex items-center gap-8">
          <p className="text-lg text-headingColor font-semibold">
            <span className="text-sm text-red-500">$</span> {prod_price}
          </p>
        </div>
      </div>
    </div>
  </>
);

const Menu = ({ items }) => {
  // const [itemss, setitemss] = useState([]);

  // const [{ cartitemss }, dispatch] = useStateValue();

  // const addtocart = () => {
  //   dispatch({
  //     type: actionType.SET_CARTitemsS,
  //     cartitemss: itemss,
  //   });
  //   localStorage.setitems("cartitemss", JSON.stringify(itemss));
  // };

  // useEffect(() => {
  //   addtocart();
  // }, [itemss]);

  if (!items) {
    return (
      <div className="text-center text-red-600 mt-4 font-bold text-2xl">
        No menu items available.
      </div>
    );
  }

  // Organize items by category
  const itemsByCategory = items.reduce((acc, items) => {
    const { category } = items;
    // console.log(category);
    const uppercaseCategory = category.toUpperCase();
    acc[uppercaseCategory] = acc[uppercaseCategory] || [];
    acc[uppercaseCategory].push(items);
    return acc;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.entries(itemsByCategory).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div className="menu mt-4 flex flex-col">
      <h2 className="text-5xl font-extrabold mb-8 text-headingColor tracking-wproductIde">
        Explore Our Delectable Menu
      </h2>

      {sortedCategories.map(([category, categoryitems]) => (
        <div key={category} className="mb-8 flex gap-12 flex-wrap flex-col">
          {/* <h3 className="text-3xl font-light mb-4 text-gray-600 relative inline-block">
            <span className="border-b-2 border-gray-400 pb-2 pr-4">
              Category: {category}
            </span>
          </h3> */}

          <h3 className="text-3xl font-semibold mb-4 text-headingColor relative inline-block">
            <span className="border-b-2 border-gradient pb-2 pr-4">
              Category: {category}
            </span>
          </h3>

          <div className="flex gap-12 flex-wrap">
            {categoryitems.map((items, index) => (
              <Menuitems key={index} {...items} />
            ))}
          </div>
        </div>
      ))}
      {/* <CartContainer/> */}
    </div>
  );
};

// const Menu = ({ items }) => {
//   return (
//     <div className="menu mt-4 flex flex-col">
//       <h2 className="text-5xl font-extrabold mb-8 text-headingColor tracking-wproductIde">
//         Explore Our Delectable Menu
//       </h2>

//       {items.map((items) => (
//         <MenuitemsCard key={items.productId} items={items} />
//       ))}
//     </div>
//   );
// };

export default Menu;
