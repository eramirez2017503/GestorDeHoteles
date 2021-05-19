'use strict'

var express = require('express');
var bodyParser =  require('body-parser');
var userRoute = require('./routes/user.route');
var serviceRoute = require('./routes/service.route');
var app = express();
const path = require('path')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use(express.static(path.join(__dirname, 'uploads')))

app.use('/v1', userRoute);
app.use('/v1', serviceRoute);

module.exports = app;