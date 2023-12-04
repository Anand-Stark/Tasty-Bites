const routes = require("express").Router();
const userControl = require('../controllers/user')

routes.post('/create',userControl.createProduct)
routes.get('/all',userControl.getAllProducts)
routes.delete('/delete/:productId',userControl.deleteProduct)

module.exports = routes;