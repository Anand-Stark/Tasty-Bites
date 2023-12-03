const routes = require("express").Router();
const userControl = require('../controllers/user')

routes.post('/create',userControl.createProduct)
routes.get('/all',userControl.getAllProducts)

module.exports = routes;