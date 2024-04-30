// writing the user functions here :
const express = require("express");
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
let data = [];
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuid4 } = require("uuid");
const nodemailer = require("nodemailer");
const { log } = require("firebase-functions/logger");
const redis = require('redis');
const client = require('../util/redis');

// const otp = 123789;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "starkyam31@gmail.com",
    pass: "zlev mwti hhaz oknc",
  },
});

exports.jwtVerification = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "no token" });
  }

  const getToken = req.headers.authorization.split(" ")[1];

  // console.log(getToken);

  try {
    const recievedToken = await admin.auth().verifyIdToken(getToken);
    if (!recievedToken)
      return res
        .status(500)
        .json({ success: false, msg: "Authorization failed" });

    return res.status(200).json({ success: false, msg: recievedToken });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, msg: "problem in recieving token" });
  }
};

// now, this token has to be sent to the frontend after validation :

// for post route :
exports.createProduct = async (req, res) => {
  try {
    const id = Date.now();

    const data = {
      productId: id,
      prod_name: req.body.prod_name,
      prod_price: req.body.prod_price,
      prod_category: req.body.prod_category,
      prod_image: req.body.prod_image,
    };

    // console.log(data);

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    
    return res.status(200).send({ success: true, data: data });
  } catch {
    return res.send({ success: false, msg: `Error :${err}` });
  }
};

exports.getAllProducts = async (req, res) => {
  (async () => {
    try {
      let query = db.collection("products");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).json({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
};

// writing the logic for deleting a product :
exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
      .collection("products")
      .doc(`/${productId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
};

// getting all the users :

const listALlUsers = async (nextpagetoken) => {
  admin
    .auth()
    .listUsers(10, nextpagetoken)
    .then((listuserresult) => {
      listuserresult.users.forEach((rec) => {
        data.push(rec.toJSON());
      });
      if (listuserresult.pageToken) {
        listALlUsers(listuserresult.pageToken);
      }
    })
    .catch((er) => console.log(er));
};

// segregating the users as per their type :
exports.createUserType = async (req, res) => {
  const userId = req.params.userId;
  const type = req.query.type;

  console.log(userId, type);

  try {
    const data = {
      type: type,
    };

    const response = await db.collection("users").doc(`/${userId}/`).set(data);

    return res.status(200).send({ success: true, data: response });
  } catch {
    return res.send({ success: false, msg: `Error` });
  }
};

exports.getUserType = async (req, res) => {
  const userId = req.params.userId;

  console.log(userId);

  try {
    const response = await db.collection("users").doc(`/${userId}/`).get();

    // console.log(response);

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    return res.status(500).send({ success: false, msg: `Error :${err}` });
  }
};

exports.getAllUsers = async (req, res) => {
  listALlUsers();
  try {
    return res
      .status(200)
      .send({ success: true, data: data, dataCount: data.length });
  } catch (er) {
    return res.send({
      success: false,
      msg: `Error in listing users :,${er}`,
    });
  }
};

// exports.getUserInfo = async (req, res) => {
//   const uid = req.params.userId;

//   try {
//     const userRecord = await admin.auth().getUser(uid);

//     // Extract relevant user data
//     const userData = {
//       uid: userRecord.uid,
//       email: userRecord.email,
//       emailVerified: userRecord.emailVerified,
//       photo: userRecord.photoURL,
//       name: userRecord.displayName,
//     };

//     return res.status(200).send({ success: true, data: userData });
//   } catch (er) {
//     return res.send({
//       success: false,
//       msg: `Error in listing users :,${er}`,
//     });
//   }
// };

exports.getUserInfo = async (req, res) => {
  const uid = req.params.userId;

  try {
    const cacheKey = `user-${uid}`;
    let userData = await client.get(cacheKey);

    if (!userData) {
      const userRecord = await admin.auth().getUser(uid);

      // Extract relevant user data
      userData = {
        uid: userRecord.uid,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        photo: userRecord.photoURL,
        name: userRecord.displayName,
        // Add other fields you need
      };

      client.set(cacheKey, JSON.stringify(userData));
      console.log('User data set into Redis cache');
    } else {
      console.log('User data retrieved from Redis cache');
      userData = JSON.parse(userData);
    }

    return res.status(200).send({ success: true, data: userData });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return res.send({
      success: false,
      msg: `Error in fetching user data: ${error}`,
    });
  }
};

exports.postUserReservation = async (req, res) => {
  const userId = req.params.userId;

  // console.log(userId);

  try {
    const reservationId = uuid4();

    const data = {
      userId: userId,
      reservationId: reservationId,
      name: req.body.name,
      tableSize: req.body.tableSize,
      date: req.body.date,
      startTimeHours: req.body.startTimeHours,
      startTimeMinute: req.body.startTimeMinutes,
      startTimePeriod: req.body.startTimePeriod,
      endTimeHours: req.body.endTimeHours,
      endTimeMinutes: req.body.endTimeMinutes,
      endTimePeriod: req.body.endTimePeriod,
      description: req.body.description,
      sts: "Pending",
    };

    console.log(data);

    const response = await db
      .collection("reservation")
      .doc(`${reservationId}`)
      .set(data);

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, msg: `Error is ${err}` });
  }
};

exports.getUserReservation = async (req, res) => {
  try {
    let query = db.collection("reservation");

    let response = [];

    await query.get().then((querysnap) => {
      let docs = querysnap.docs;

      docs.map((doc) => {
        response.push({ ...doc.data() });
      });

      return response;
    });

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    res.status(400).send({ success: false, msg: `Error is ${err}` });
  }
};

exports.updateReservation = async (req, res) => {
  const sts = req.query.sts;
  const reservationId = req.params.reservationId;

  try {
    const updRes = await db
      .collection("reservation")
      .doc(`/${reservationId}/`)
      .update({ sts });

    return res.status(200).send({ success: true, data: updRes });
  } catch (err) {
    return res.status(400).send({ success: false, Error: `Error is ${err}` });
  }
};

exports.postUserInformation = async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    };

    console.log(data);

    const response = await db.collection("profile").doc(`${userId}`).set(data);

    return res.status(200).send({ success: true, data: response });
  } catch {
    return res.status(400).send({ success: false });
  }
};

exports.getUserProfileInformation = async (req, res) => {
  try {
    const userId = req.params.userId;

    // console.log(userId);

    const response = await db.collection("profile").doc(`/${userId}/`).get();

    return res.status(200).send({ success: true, data: response });
  } catch (err) {
    res.status(400).send({ success: false, Error: `${err}` });
  }
};

// exports.addToCart = async (req, res) => {
//   const userId = req.params.userId;
//   const productId = req.body.productId;

//   try {
//     const doc = await db
//       .collection("cartItems")
//       .doc(`/${userId}/`)
//       .collection("items")
//       .doc(`/${productId}/`)
//       .get();

//     if (doc.data()) {
//       const quantity = doc.data().quantity + 1;
//       const updatedItem = await db
//         .collection("cartItems")
//         .doc(`/${userId}/`)
//         .collection("items")
//         .doc(`/${productId}/`)
//         .update({ quantity });
//       return res.status(200).send({ success: true, data: updatedItem });
//     } else {
//       const data = {
//         productId: productId,
//         prod_name: req.body.prod_name,
//         prod_category: req.body.prod_category,
//         prod_price: req.body.prod_price,
//         prod_image: req.body.prod_image,
//         quantity: 1,
//       };
//       const addItems = await db
//         .collection("cartItems")
//         .doc(`/${userId}/`)
//         .collection("items")
//         .doc(`/${productId}/`)
//         .set(data);
//       return res.status(200).send({ success: true, data: addItems });
//     }
//   } catch (err) {
//     return res.send({ success: false, msg: `Error :${err}` });
//   }
// };

exports.addToCart = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  try {
    // Check if the data is cached
    const cacheKey = `addToCart:${userId}:${productId}`;
    const cachedData = await client.get(cacheKey);
    
    if (cachedData) {
      // If data is cached, return the cached response
      const parsedData = JSON.parse(cachedData);
      return res.status(200).send(parsedData);
    }

    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .update({ quantity });
      
      // Cache the updated response
      const data = { success: true, data: updatedItem };
      client.setex(cacheKey, 3600, JSON.stringify(data)); // Cache for 1 hour
      return res.status(200).send(data);
    } else {
      const data = {
        productId: productId,
        prod_name: req.body.prod_name,
        prod_category: req.body.prod_category,
        prod_price: req.body.prod_price,
        prod_image: req.body.prod_image,
        quantity: 1,
      };
      const addItems = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .set(data);
      
      // Cache the added item response
      const responseData = { success: true, data: addItems };
      client.setex(cacheKey, 3600, JSON.stringify(responseData)); // Cache for 1 hour
      return res.status(200).send(responseData);
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
};


// exports.updateCart = async (req, res) => {
//   const userId = req.params.user_id;
//   const productId = req.query.productId;
//   const type = req.query.type;

//   try {
//     const doc = await db
//       .collection("cartItems")
//       .doc(`/${userId}/`)
//       .collection("items")
//       .doc(`/${productId}/`)
//       .get();

//     if (doc.data()) {
//       if (type === "increment") {
//         const quantity = doc.data().quantity + 1;
//         const updatedItem = await db
//           .collection("cartItems")
//           .doc(`/${userId}/`)
//           .collection("items")
//           .doc(`/${productId}/`)
//           .update({ quantity });
//         return res.status(200).send({ success: true, data: updatedItem });
//       } else {
//         if (doc.data().quantity === 1) {
//           await db
//             .collection("cartItems")
//             .doc(`/${userId}/`)
//             .collection("items")
//             .doc(`/${productId}/`)
//             .delete()
//             .then((result) => {
//               return res.status(200).send({ success: true, data: result });
//             });
//         } else {
//           const quantity = doc.data().quantity - 1;
//           const updatedItem = await db
//             .collection("cartItems")
//             .doc(`/${userId}/`)
//             .collection("items")
//             .doc(`/${productId}/`)
//             .update({ quantity });
//           return res.status(200).send({ success: true, data: updatedItem });
//         }
//       }
//     }
//   } catch (err) {
//     return res.send({ success: false, msg: `Error :${err}` });
//   }
// };

exports.updateCart = async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.query.productId;
  const type = req.query.type;

  try {
    // Check if the data is cached
    const cacheKey = `updateCart:${userId}:${productId}:${type}`;
    const cachedData = await client.get(cacheKey);
    
    if (cachedData) {
      // If data is cached, return the cached response
      const parsedData = JSON.parse(cachedData);
      return res.status(200).send(parsedData);
    }

    const doc = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productId}/`)
      .get();

    if (doc.exists) {
      let updatedItem;
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        updatedItem = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({ quantity });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .delete();
          updatedItem = { success: true, data: "Item deleted" };
        } else {
          const quantity = doc.data().quantity - 1;
          updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({ quantity });
        }
      }

      // Cache the updated response
      const responseData = { success: true, data: updatedItem };
      client.setex(cacheKey, 3600, JSON.stringify(responseData)); // Cache for 1 hour
      return res.status(200).send(responseData);
    } else {
      return res.status(404).send({ success: false, msg: "Item not found" });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
};

exports.getCartItems = async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      let query = db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items");
      let response = [];

      await query.get().then((querysnap) => {
        let docs = querysnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (er) {
      return res.send({ success: false, msg: `Error :,${er}` });
    }
  })();
};


exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.query.id;

    console.log(itemId, userId);

    const response = await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${itemId}/`)
      .delete();

    return res.status(200).send({ success: true, data: response });
  } catch (Err) {
    res.status(400).send({ success: true, Error: `${Err}` });
  }
};

exports.stripePayementPremium = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.uid,
      paymentType: req.body.data.paymentType,
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Premium",
          },
          unit_amount: 12000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer: customer.id,
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
};

exports.stripePayment = async (req, res) => {
  console.log(req.body.data);
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.uid,
      cart: JSON.stringify(req.body.data.cart),
      total: req.body.data.total,
      paymentType: req.body.data.paymentType,
    },
  });

  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.prod_name,
          images: [item.prod_image],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: req.body.data.total*100/item.quantity,
      },
      quantity: item.quantity,
    };
  });

  // console.log(line_items);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["IN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },

    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
};

let endpointSecret;
// endpointSecret = process.env.WEBHOOK_SECRET;

exports.webHook = (req, res) => {
  const sig = req.headers["stripe-signature"];

  let eventType;
  let data;

  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then((customer) => {
      console.log(customer.metadata.paymentType);

      if (customer.metadata.paymentType === "orders") {
        createOrder(customer, data, res);
      }
      if (customer.metadata.paymentType === "premium") {
        createPremiumCostmers(customer, res);
      }
    });
  }

  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
};

const createPremiumCostmers = async (customer, res) => {
  try {
    const premiumId = Date.now();
    const userId = customer.metadata.user_id;

    const data = {
      premiumId: premiumId,
      userId : userId,
    };

    await db.collection("premium").doc(`/${userId}/`).set(data);

    console.log("*******Premium User Added Succesfully*********");

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const createOrder = async (customer, intent, res) => {
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };

    await db.collection("orders").doc(`/${orderId}/`).set(data);

    deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.cart));
    console.log("*****************************************");

    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (userId, items) => {
  console.log("Inside the delete");

  console.log(userId);

  console.log("*****************************************");
  items.map(async (data) => {
    console.log("-------------------inside--------", userId, data.productId);
    await db
      .collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${data.productId}/`)
      .delete()
      .then(() => console.log("-------------------successs--------"));
  });
};

exports.getOrders = async (req, res) => {
  (async () => {
    try {
      let query = db.collection("orders");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
};

exports.getPremiumUsers = async (req, res) => {
  
  try{
      
    let query = db.collection("premium");

    let response = [];

    await query.get().then((querysnap) => {
          let docs = querysnap.docs;

          docs.map((doc) => {
              response.push({...doc.data()})
          })

          return response;
    })

    return res.status(200).send({success:true, data:response})
}
catch (err) {
  res.status(400).send({ success: false, msg: `Error is ${err}` });
}
}

exports.updateOrder = async (req, res) => {
  const order_id = req.params.order_id;
  const sts = req.query.sts;

  try {
    const updatedItem = await db
      .collection("orders")
      .doc(`/${order_id}/`)
      .update({ sts });
    return res.status(200).send({ success: true, data: updatedItem });
  } catch (er) {
    return res.send({ success: false, msg: `Error :,${er}` });
  }
};

exports.deleteAllCart = async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId);
  try {
    await db
      .collection("cartItems")
      .doc(`/${userId}`)
      .collection("items")
      .delete()
      .then((result) => {
        console.log("Carts emptied successfully");
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error :${err}` });
  }
};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

exports.sendOtp = async (req, res) => {
  const email = req.params.user_email;
  const otp = generateOTP();

  console.log(email, otp);

  const mailOptions = {
    from: "starkyam31@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "OTP sent successfully", genOtp: otp });
    }
  });
};

exports.verifyOtp = async (req, res) => {
  const enteredOtp = req.body.otp;
  const generatedOtp = req.body.generatedOtp;

  if (generatedOtp == enteredOtp) {
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "OTP verification failed" });
  }
};
