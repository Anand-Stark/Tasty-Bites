const routes = require("express").Router();
const userControl = require('../controllers/user')
const admin = require("firebase-admin");


// get routes : -> 

routes.get('/',userControl.getUser);

routes.get('/jwtVerification',userControl.jwtVerification)


routes.get('/all', userControl.getAllUsers);



module.exports = routes;

