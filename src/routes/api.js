var express = require('express');
var app = express.Router();
const ApiController = require('../controllers/ApiController')
const { auth, requiresAuth } = require('express-openid-connect');
var auth_middleware = [requiresAuth()]
var apicontroller = require('../controllers/ApiController.js');
//--------
app.post('/', [], ApiController.test_method);

module.exports = app