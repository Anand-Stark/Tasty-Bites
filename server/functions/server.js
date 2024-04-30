const functions = require("firebase-functions");
const  {app } = require("./index.js");

exports.app = functions.https.onRequest(app);

