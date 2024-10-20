require("dotenv").config();
const express = require("express");
const session_and_cookie_secret=process.env.SESSION_COOKIE_SECRET || "M3TUK5PLH7W9RFXZ"
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require("express-session");
const path = require("path");
var cors = require('cors')
// SOCKET.IO
const socketPort = 8008;
const { emit } = require("process");
var jsonParser = bodyParser.json({ limit: "50mb" });
const { toBool } = require('../modules/helpers.js');
const { Client, Pool } = require('pg');

module.exports = function ExpressMiddleware(app, server){
	CoreExpressMiddleware(app,server);
	ExpressLogMiddleware(app,server);
	SocketConnection(app,server);
}

function CoreExpressMiddleware(app,server){
	// CONTROL PAYLOAD SIZE 
	app.use(express.json({limit: '50mb'}));
	app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
	// SET VIEWS AND ENGINE
	app.set("views", path.join(__dirname, "../views"));
	app.set("view engine", "pug");
	app.use(express.static(path.join(__dirname, "../../", "public")));
	// BODY PARSER
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(session({ secret: session_and_cookie_secret }));
	app.use(cookieParser(session_and_cookie_secret));
	// CORS
	app.use(cors())
}

function ExpressLogMiddleware(app,server){
	// Middleware to log HTTP responses
	app.use((req, res, next) => {
	  const { routelog } = require('../modules/chalk');
	  const startTime = new Date();
	  const originalEnd = res.end;
	  res.end = function(chunk, encoding) {
	    const endTime = new Date();
	    const responseTime = endTime - startTime;
	    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	    // console.log(clientIp)
	    routelog(req.method, res.statusCode, req.url, responseTime);
	    originalEnd.call(res, chunk, encoding);
	  };
	  next();
	});
	app.use((req,res,next)=>{
	  const { debugga, debugtmp, errmsg } = require('../modules/chalk');
	  req.debug = toBool(`${process.env.DEBUG}`);
	  res.locals.base_url = process.env.INVESTIGATION_BASEURL;
	  console.__proto__.debuglog = (logname='MSG', msg)=>{
	    if(req.debug){
	      debugga(logname, msg)
	    }
	  }
	  console.__proto__.tmp = (msg)=>{
	    if(req.debug){
	      debugtmp(msg)
	    }
	  }
	  console.__proto__.err = (logname, msg)=>{
	      errmsg(logname, msg)
	  }
	  String.prototype.encodeCommas = function(){
	    return String(this).replaceAll("'", "&#39;");
	  }
	  String.prototype.decodeCommas = function(){
	    return String(this).replaceAll("&#39;", "'");
	  }

	  next();
	})
}

function SocketConnection(app, server){
	console.log('SOCKET CONNECTION')
	const io = require("socket.io")(server, {
	   cors: {
	      origin: "",
	      methods: ["GET", "POST"],
	   },
	});
	io.on("connection", (socket) => {
		// POSTGRES CODE
		// const client = new Client({ connectionString });
		// client.connect();
		// console.log("a user connected");
		// client.on('new_user_trigger', (msg) => {
		//   console.log('Recevied notification')
		//   // console.log('Received notification:', msg.payload);
		//   // io.emit('newEntry', msg.payload);
		// });
		// client.query('LISTEN new_entry_channel');
		// client.on('notification', (msg) => {
		//   console.log('Received notification:', msg.payload);
		//   io.emit('newEntry', msg.payload);
		// });
		socket.on("chat message", (msg) => {
			console.log('Msg', msg);
		});
		// close event when user disconnects from app
		socket.on("disconnect", () => {
			// client.end()
			console.log("user disconnected");
		});
	});
}

function ExpressAuth0(){
	// AUTH0
	app.use(
	auth({
	  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
	  baseURL: process.env.BASE_URL,
	  clientID: process.env.AUTH0_CLIENT_ID,
	  secret: process.env.SESSION_SECRET,
	  authRequired: false,
	  auth0Logout: true,
	  clientSecret: process.env.CLIENT_SECRET,
	  authorizationParams: {
	    response_type: "code",
	    audience: process.env.AUTH0_AUDIENCE,
	  },
	})
	);

	app.use((req, res, next) => { res.locals.isAuthenticated = req.oidc.isAuthenticated(); next(); });
}