const functions= require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");
const express = require("express");

const app = express();

app.use(express.json());

// cors origin :
const cors = require("cors");
app.use(cors({origin:true}));

// the api can be accessed from anywhere : 
app.use((req,res,next) => {
    res.set("Access-Control-Allow-Origin","*")
    next();
})

// firebase :

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });

//   making and testing the API endpoints :     

app.get("/",(req,res) => {
   return res.send("End Point Working");
})

exports.app = functions.https.onRequest(app)



