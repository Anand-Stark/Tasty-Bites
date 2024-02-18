const routes = require("express").Router();
const userControl = require('../controllers/user')


// get routes : -> 

routes.get('/jwtVerification',userControl.jwtVerification)


routes.get('/all', userControl.getAllUsers);

routes.post('/users/:userId',userControl.createUserType)

routes.get('/user-type/:userId',userControl.getUserType)

routes.get('/user-info/:userId',userControl.getUserInfo)

routes.post('/user-reservation/:userId',userControl.postUserReservation)

module.exports = routes;


