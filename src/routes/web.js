var express = require('express');
var app = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
var webcontroller = require('../controllers/WebController.js')
var auth_middleware = [requiresAuth()] // [...auth_middleware]
// --------
app.get('/', [], (req,res)=>{
	res.render('index', {});
})
app.get('/fileupload', [], (req,res)=>{
	res.render('pages/fileupload', {
	    // user: req.oidc.user
	});
});
app.get('/socketio', [], (req,res)=>{
	res.render('pages/socket-io', {
	    // user: req.oidc.user
	});
});
//--------
module.exports = app;