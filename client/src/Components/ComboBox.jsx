import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect, useState } from "react";
import { setSearchItem, getSearchItem } from "../context/actions/isSearch";
import { useDispatch } from "react-redux";
import { addNewItemToCart, getAllCartItems } from "../api";
import { IoBasket } from "react-icons/io5";
import { alertSuccess, alertNull } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";
import AddToCart from "./AddToCart";

const ComboBox = () => {
  const items = useSelector((state) => state.products);
  // taking the user states :
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [searchItem, setItem] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if products is null or undefined before rendering
  if (!items) {
    return null; // Or you can render a loading indicator or a message
  }


  const filteredFoodItems = items.filter((item) =>
    item.prod_name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleInputChange = (e) => {
    setItem(e.target.value);
    setShowDropdown(true);
  };

  const handleItemClick = (item) => {
    setItem(item.prod_name);

    // set the search item state :
    dispatch(setSearchItem(item));

    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
  };

  // adding to the cart function :
  // const sendToCart = (data) => {
  //   dispatch(alertSuccess("Item Added ❤️"));

  //   addNewItemToCart(user?.user_id, data)
  //     .then((res) => {
  //       getAllCartItems(user.user_id).then((items) => {
  //         dispatch(setCartItems(items));
  //         dispatch(alertNull());
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("error No Items Found");
  //     });
  // };

  return (
    <div>
      <div
        className="px-10 py-1 relative font-bold"
        onClick={handleInputBlur}
      >
        <input
          type="text"
          autoCorrect=""
          placeholder="Search food items..."
          className="py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 "
          value={searchItem}
          onChange={handleInputChange}
        />
        {showDropdown && (
          <ul className="absolute top-full left-4 w-[90%] bg-white border border-gray-300 rounded-lg shadow-lg">
            {filteredFoodItems.map((item, index) => (
              <>

              <li
                key={index}
                className="px-2 py-2 cursor-pointer hover:bg-gray-100 flex justify-evenly rounded-lg items-center gap-4"
                onClick={() => handleItemClick(item)}
              >
                <img className="w-10" src={item.prod_image} alt="Food" />

                <p className="text-md font-bold">{item.prod_name}</p>

                <AddToCart data={item} index={index}/>

              </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComboBox;
