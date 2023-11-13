const routes = require('express').Router;
const userControl = require('../controllers/user')

routes.get('/',userControl.getUser);

