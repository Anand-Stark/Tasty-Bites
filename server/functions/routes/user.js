const routes = require("express").Router();
const userControl = require('../controllers/user')

// get routes : -> 

routes.get('/',userControl.getUser);

routes.get('/jwt-verification',userControl.jwtVerification)

module.exports = routes;