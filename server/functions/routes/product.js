const routes = require("express").Router();
const userControl = require('../controllers/user')
const express = require("express")

routes.post('/create',userControl.createProduct)
routes.get('/all',userControl.getAllProducts)
routes.delete('/delete/:productId',userControl.deleteProduct)


routes.post("/addToCart/:userId",userControl.addToCart);
  
  // update cart to increase and decrease the quantity
  routes.post("/updateCart/:user_id", userControl.updateCart);
  
  // get all the cartitems for that user
  routes.get("/getCartItems/:user_id", userControl.getCartItems);

  routes.post("/removeCartItem/:userId",userControl.deleteCartItem)

  routes.post("/create-checkout-session", userControl.stripePayment);

  routes.post("/create-checkout-seesion-premium",userControl.stripePayementPremium)

  routes.post("/webhook",express.raw({ type: "application/json" }),userControl.webHook);
  
  // orders
  routes.get("/orders", userControl.getOrders);

  routes.get("/premiumUsers",userControl.getPremiumUsers)
  
  // // update the order status
  routes.post("/updateOrder/:order_id", userControl.updateOrder);

  routes.post("/delete-cart/:userId",userControl.deleteAllCart);



module.exports = routes;
