const routes = require("express").Router();
const userControl = require("../controllers/user");
const express = require("express");

/**
 * @swagger
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prod_name:
 *                 type: string
 *                 description: The name of the product.
 *               prod_price:
 *                 type: string
 *                 description: The price of the product.
 *               prod_category:
 *                 type: string
 *                 description: The category of the product.
 *               prod_image:
 *                 type: string
 *                 description: The link to the image of the product.
 *     responses:
 *       200:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the product creation was successful.
 *                 data:
 *                   type: object
 *                   description: Information about the created product.
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds component of the write time.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds component of the write time.
 *               description: Response indicating the status of the product creation process.
 */

routes.post("/create", userControl.createProduct);

/**
 * @swagger
 * /api/products/all:
 *   get:
 *     summary: Get all products
 *     description: Retrieves a list of all products.
 *     responses:
 *       200:
 *         description: A list of products retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       prod_image:
 *                         type: string
 *                         description: The URL of the product image.
 *                       productId:
 *                         type: integer
 *                         description: The unique ID of the product.
 *                       prod_category:
 *                         type: string
 *                         description: The category of the product.
 *                       prod_price:
 *                         type: string
 *                         description: The price of the product.
 *                       prod_name:
 *                         type: string
 *                         description: The name of the product.
 *                   description: List of products.
 */

routes.get("/all", userControl.getAllProducts);

/**
 * @swagger
 * /api/products/delete/{productId}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product based on the provided product ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to be deleted.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds part of the write time.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds part of the write time.
 *                   description: Details about the deletion operation.
 */

routes.delete("/delete/:productId", userControl.deleteProduct);

/**
 * @swagger
 * /api/products/addToCart/{userId}:
 *   post:
 *     summary: Add a product to the cart
 *     description: Add a product to the cart of the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart the product will be added to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to be added to the cart.
 *     responses:
 *       200:
 *         description: Product added to the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the product was added to the cart successfully.
 *                 data:
 *                   type: object
 *                   description: Information about the operation.
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds component of the write time.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds component of the write time.
 *               description: Response indicating the status of the operation.
 */

routes.post("/addToCart/:userId", userControl.addToCart);

// update cart to increase and decrease the quantity

routes.post("/updateCart/:user_id", userControl.updateCart);

// get all the cartitems for that user

/**
 * @swagger
 * /api/products/getCartItems/{user_id}:
 *   get:
 *     summary: Get cart items for a user
 *     description: Retrieves cart items for the specified user.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose cart items are to be retrieved.
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       prod_image:
 *                         type: string
 *                         description: The URL of the product image.
 *                       productId:
 *                         type: integer
 *                         description: The ID of the product.
 *                       prod_category:
 *                         type: string
 *                         description: The category of the product.
 *                       prod_price:
 *                         type: string
 *                         description: The price of the product.
 *                       prod_name:
 *                         type: string
 *                         description: The name of the product.
 *                       quantity:
 *                         type: integer
 *                         description: The quantity of the product in the cart.
 *                   description: List of cart items for the user.
 */

routes.get("/getCartItems/:user_id", userControl.getCartItems);

/**
 * @swagger
 * /api/products/removeCartItem/{userId}:
 *   post:
 *     summary: Remove a product from the cart
 *     description: Remove a product from the cart of the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose cart the product will be removed from.
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be removed from the cart.
 *     responses:
 *       200:
 *         description: Product removed from the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the product was removed from the cart successfully.
 *                 data:
 *                   type: object
 *                   description: Information about the operation.
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds component of the write time.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds component of the write time.
 *               description: Response indicating the status of the operation.
 */

routes.post("/removeCartItem/:userId", userControl.deleteCartItem);

routes.post("/create-checkout-session", userControl.stripePayment);

routes.post(
  "/create-checkout-seesion-premium",
  userControl.stripePayementPremium
);

routes.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  userControl.webHook
);

/**
 * @swagger
 * /api/products/orders:
 *   get:
 *     summary: Get user orders
 *     description: Retrieves orders placed by users.
 *     responses:
 *       200:
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       amount:
 *                         type: integer
 *                         description: The total amount of the order.
 *                       total:
 *                         type: string
 *                         description: The total cost of the order.
 *                       orderId:
 *                         type: integer
 *                         description: The ID of the order.
 *                       created:
 *                         type: integer
 *                         description: The timestamp when the order was created.
 *                       payment_method_types:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: The payment method types used for the order.
 *                       shipping_details:
 *                         type: object
 *                         properties:
 *                           address:
 *                             type: object
 *                             properties:
 *                               country:
 *                                 type: string
 *                                 description: The country of the shipping address.
 *                               city:
 *                                 type: string
 *                                 description: The city of the shipping address.
 *                               state:
 *                                 type: string
 *                                 description: The state of the shipping address.
 *                               postal_code:
 *                                 type: string
 *                                 description: The postal code of the shipping address.
 *                               line2:
 *                                 type: string
 *                                 description: The second line of the shipping address.
 *                               line1:
 *                                 type: string
 *                                 description: The first line of the shipping address.
 *                           name:
 *                             type: string
 *                             description: The name associated with the shipping address.
 *                       intentId:
 *                         type: string
 *                         description: The ID of the payment intent associated with the order.
 *                       userId:
 *                         type: string
 *                         description: The ID of the user who placed the order.
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             prod_image:
 *                               type: string
 *                               description: The URL of the product image.
 *                             quantity:
 *                               type: integer
 *                               description: The quantity of the product in the order.
 *                             productId:
 *                               type: integer
 *                               description: The ID of the product.
 *                             prod_category:
 *                               type: string
 *                               description: The category of the product.
 *                             prod_price:
 *                               type: string
 *                               description: The price of the product.
 *                             prod_name:
 *                               type: string
 *                               description: The name of the product.
 *                         description: List of items included in the order.
 *                       status:
 *                         type: string
 *                         description: The status of the order.
 *                       customer:
 *                         type: object
 *                         properties:
 *                           address:
 *                             type: object
 *                             properties:
 *                               country:
 *                                 type: string
 *                                 description: The country of the customer's address.
 *                               city:
 *                                 type: string
 *                                 description: The city of the customer's address.
 *                               state:
 *                                 type: string
 *                                 description: The state of the customer's address.
 *                               postal_code:
 *                                 type: string
 *                                 description: The postal code of the customer's address.
 *                               line2:
 *                                 type: string
 *                                 description: The second line of the customer's address.
 *                               line1:
 *                                 type: string
 *                                 description: The first line of the customer's address.
 *                           tax_ids:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: The tax IDs associated with the customer.
 *                           phone:
 *                             type: string
 *                             description: The phone number of the customer.
 *                           tax_exempt:
 *                             type: string
 *                             description: The tax exemption status of the customer.
 *                           name:
 *                             type: string
 *                             description: The name of the customer.
 *                           email:
 *                             type: string
 *                             description: The email address of the customer.
 *                         description: Details of the customer who placed the order.
 *                       sts:
 *                         type: string
 *                         description: The status of the order.
 */
// orders
routes.get("/orders", userControl.getOrders);

// // update the order status
/**
 * @swagger
 * /api/products/updateOrder/{order_id}:
 *   post:
 *     summary: Update order status
 *     description: Update the status of an order identified by its ID.
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to be updated.
 *       - in: query
 *         name: sts
 *         required: true
 *         schema:
 *           type: string
 *         description: The new status to be set for the order.
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the order status was updated successfully.
 *                 data:
 *                   type: object
 *                   description: Information about the operation.
 *                   properties:
 *                     _writeTime:
 *                       type: object
 *                       properties:
 *                         _seconds:
 *                           type: integer
 *                           description: The seconds component of the write time.
 *                         _nanoseconds:
 *                           type: integer
 *                           description: The nanoseconds component of the write time.
 *               description: Response indicating the status of the operation.
 */

routes.get("/premiumUsers",userControl.getPremiumUsers)
routes.post("/updateOrder/:order_id", userControl.updateOrder);

routes.post("/delete-cart/:userId", userControl.deleteAllCart);

module.exports = routes;
