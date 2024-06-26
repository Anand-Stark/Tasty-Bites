import axios from "axios"

export const baseUrl = "http://127.0.0.1:5001/food-cart-2/us-central1/app"

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
                  // console.log("ok")
                  const res = await axios.post(`${baseUrl}/api/products/create`, { ...data });
                  return res.data.data;
          }
          catch (err){
            return null;
          }
}

export const getAllProducts = async (data) =>{
      try{    
             
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

export const addUserReservation = async (userId,data) => {
     try{ 
          const res = await axios.post(`${baseUrl}/api/user/user-reservation/${userId}`,{...data})

          return res.data.data
     }
     catch(e){ 
         return null
     }
}

export const getAllReservations = async () => {
     try{
        const res = await axios.get(`${baseUrl}/api/user/user-reservation`)
        
        return res.data.data

     }
     catch(err){ 
        console.log(err);
     }
}

export const updateReservationStatus = async (reservationID,sts) => {
     try{
       const res = await axios.post(`${baseUrl}/api/user/update-reservation-status/${reservationID}`,
       null,
       {params:{sts:sts}}
       )

       return res.data.data
     }
     catch(err){ 
        return null
     }
}

export const postProfileInfo = async (userId,data) => {
     try{

      const res = await axios.post(`${baseUrl}/api/user/user-profile/${userId}`,
       {...data}
       )

       return res.data.data

     }
     catch(err){
        return null
     }
}

export const getProfileInfo = async(userId) => {
    try{
      const res = await axios.get(`${baseUrl}/api/user/user-profile/${userId}`)

      return res.data.data
    }
    catch(err){
      console.log(err);
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

export const getPremiumUsers = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/products/premiumUsers`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    return null;
  }
};


export const getUserInfo = async(userId) => {
    try{
      const res = await axios.get(`${baseUrl}/api/user//user-info/${userId}`)

      return res.data.data;
    }
    catch(err){
      console.log(err);
      return null
    }
}

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

export const addUserType  = async(userId,type) => {
   try{
      const res = await axios.post(`${baseUrl}/api/user/users/${userId}`,null,{
        params:{type:type}
      })
      return res.data.data
   }
   catch{
      return null;
   }
}


export const getUserTypes = async (userId) => {
   try {   
          // console.log(userId);
          const res = await axios.get(`${baseUrl}/api/user/user-type/${userId}`);

          if(res.status !== 200)
          {
            console.log('Something wrong from getUserType');
            return ;
          }

          return res.data.data;
   }
   catch(e){

    console.log(e);

   }
}



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

export const deleteAllCart = async(user_id) => {
   try{
      const res = await axios.post(`${baseUrl}/api/products/delete-cart/${user_id}`)
      return res.data.data
   }
   catch(error){
      return null;
   }
}

export const removeCartItem = async(userId,itemId) => { 
    try{

      console.log("Inside axios :"+itemId );

      const res = await axios.post(`${baseUrl}/api/products/removeCartItem/${userId}`,
      null,
      {params: {id:itemId} }
      )

      return res.data.data

    }
    catch{
        return null
    }
}

export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/products/orders`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getPremiums = async () => {
    try{
       const res = await axios.get(`${baseUrl}/api/products/premiumUsers`)
       
       return res.data.data
    }
    catch(err){
       return null
    }
}

// update the order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const sendOtp = async(email) => {
  try{
    const res = await axios.post(`${baseUrl}/api/user/send-otp/${email}`)
    return res.data
  }
  catch(err){
    return null
  }
}

export const verifyOtp = async(otp,genOtp) => {
  try{
    const res = await axios.post(`${baseUrl}/api/user/verify-otp`,{otp:otp, generatedOtp:genOtp})
    return res.data.success
  }
  catch(err){
    return null
  }
} 





