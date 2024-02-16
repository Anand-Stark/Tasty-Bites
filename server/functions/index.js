const functions= require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");
const express = require("express");
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const app = express();

app.use(express.json());

const logsDirectory = path.join(__dirname, 'logs');
fs.existsSync(logsDirectory) || fs.mkdirSync(logsDirectory);

// Create a rotating write stream for logging
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate every day
  path: logsDirectory
});

// Set up Morgan middleware to log requests to the console and to a file
app.use(morgan('combined', { stream: accessLogStream }));

// Logging Middleware
app.use((req, res, next) => {
  console.log("From log middleware");
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});


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

const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")


// routes : backend apis -> 
app.use('/api/user',userRoutes)
app.use('/api/products',productRoutes)



// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("From Error Middleware" , err.stack);
  res.status(500).send('Internal Server Error');
});

exports.app = functions.https.onRequest(app)