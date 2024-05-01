const admin = require("firebase-admin");
const serviceAccountKey = require("./serviceAccountKey.json");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");
const app = express();
const multer = require("multer");


const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");


app.use(express.json());

const logsDirectory = path.join(__dirname, "logs");
fs.existsSync(logsDirectory) || fs.mkdirSync(logsDirectory);

// Create a rotating write stream for logging
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate every day
  path: logsDirectory,
});

// Set up Morgan middleware to log requests to the console and to a file
app.use(morgan("combined", { stream: accessLogStream }));

// cors origin :
const cors = require("cors");
app.use(cors({ origin: true }));

// the api can be accessed from anywhere :
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});


// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TastyBites APIs",
      version: "1.0.0",
      description: "API documentation for TastyBites",
    },
    servers: [
      {
        url: "http://127.0.0.1:5001/food-cart-2/us-central1/app/",
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

// routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

// multer usage :
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define where to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original file name
  },
});

const upload = multer({ storage: storage });

// Example route that uses multer for file upload
app.post("/upload", upload.single("file"), (req, res) => {
  // Access uploaded file via req.file
  res.send("File uploaded successfully");
});

module.exports = { app }


