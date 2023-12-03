const routes = require("express").Router();
const userControl = require('../controllers/user')

routes.post('/create',userControl.createProduct)

module.exports = routes;