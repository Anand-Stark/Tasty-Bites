const routes = require("express").Router();
const userControl = require('../controllers/user')


// get routes : -> 

routes.get('/',userControl.getUser);

routes.get('/jwtVerification',userControl.jwtVerification)


routes.get('/all', userControl.getAllUsers);


module.exports = routes;


