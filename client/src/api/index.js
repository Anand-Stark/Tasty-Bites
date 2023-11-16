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


