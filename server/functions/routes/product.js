const routes = require("express").Router();
const userControl = require('../controllers/user')

routes.post('/create',userControl.createProduct)
routes.get('/all',userControl.getAllProducts)
routes.delete('/delete/:productId',userControl.deleteProduct)
routes.post("/addToCart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;
  
    try {
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
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        const data = {
          productId: productId,
          prod_name: req.body.prod_name,
          prod_category: req.body.prod_category,
          prod_price: req.body.prod_price,
          imageURL: req.body.imageURL,
          quantity: 1,
        };
        const addItems = await db
          .collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .set(data);
        return res.status(200).send({ success: true, data: addItems });
      }
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  });
  
  // update cart to increase and decrease the quantity
  routes.post("/updateCart/:user_id", async (req, res) => {
    const userId = req.params.user_id;
    const productId = req.query.productId;
    const type = req.query.type;
  
    try {
      const doc = await db
        .collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .get();
  
      if (doc.data()) {
        if (type === "increment") {
          const quantity = doc.data().quantity + 1;
          const updatedItem = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        } else {
          if (doc.data().quantity === 1) {
            await db
              .collection("cartItems")
              .doc(`/${userId}/`)
              .collection("items")
              .doc(`/${productId}/`)
              .delete()
              .then((result) => {
                return res.status(200).send({ success: true, data: result });
              });
          } else {
            const quantity = doc.data().quantity - 1;
            const updatedItem = await db
              .collection("cartItems")
              .doc(`/${userId}/`)
              .collection("items")
              .doc(`/${productId}/`)
              .update({ quantity });
            return res.status(200).send({ success: true, data: updatedItem });
          }
        }
      }
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  });
  
  // get all the cartitems for that user
  routes.get("/getCartItems/:user_id", async (req, res) => {
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
  });

module.exports = routes;