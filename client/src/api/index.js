import axios from "axios"

const baseUrl = "http://127.0.0.1:5001/food-cart-2/us-central1/app"

export const validateToken = async (token) =>{
      try{
            const res = await axios.get(`${baseUrl}/api/user/jwtVerification`,{
                     headers:{Authorization: "Bearer " + token}
            })

            return res.data.msg;

      }
      catch (err){
           return null;
      }
}

export const addNewProduct = async (data) =>{
          try{    
                  console.log("ok")
                  const res = await axios.post(`${baseUrl}/api/products/create`, { ...data });
                  return res.data.data;
          }
          catch (err){
            return null;
          }
}

export const getAllProducts = async (data) =>{
      try{    
              console.log("uwu")
              const res = await axios.get(`${baseUrl}/api/products/all`, { ...data });
              return res.data.data;
      }
      catch (err){
        return null;
      }
}

export const deleteProduct = async (productId) =>{
      try {
            const res = await axios.delete(
              `${baseUrl}/api/products/delete/${productId}`
            );
            return res.data.data;
          } catch (err) {
            return null;
          }
}

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/user/all`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};




