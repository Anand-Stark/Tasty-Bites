// writing the user functions here :
const express = require("express");
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

exports.getUser = (req, res) => {
  return res.send("ok ok ");
};
exports.jwtVerification = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ msg: "no token" });
  }

  const getToken = req.headers.authorization.split(" ")[1];

  console.log(getToken);

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
      productId : id,
      prod_name: req.body.prod_name,
      prod_price: req.body.prod_price,
      prod_category: req.body.prod_category,
      prod_image: req.body.prod_image,
    };
    
    console.log(data)

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    console.log(response);
    return res.status(200).send({ success: true, data: response });

  } catch {
    return res.send({ success: false, msg: `Error :${err}` });
  }
  
};

exports.getAllProducts = async (req,res) =>{ 
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
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error :${err}` });
    }
  })();
}
