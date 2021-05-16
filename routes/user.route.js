'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');
var mdAuth = require('../middleware/authenticated');
var connectMultiparty = require('connect-multiparty');
var upload = connectMultiparty({ uploadDir: './uploads/users'});

var api = express.Router();

//funciones para cualquier tipo de user

api.get('/prueba', userController.prueba);
api.post('/signUp', userController.signUp);
api.post('/login', userController.login);
api.put('/updateUser/:id', [mdAuth.ensureAuth], userController.updateUser);
api.put('/removeUser/:id', mdAuth.ensureAuth, userController.removeUser);
api.post('/createAdmin_Hotel/:id', [mdAuth.ensureAuth, mdAuth.validRolAdminOrAdminHotel], userController.creatUserAdmin_Hotel);
api.put('/:id/uploadImage', [mdAuth.ensureAuth, upload], userController.uploadImage); //YA
api.get('/getImage/:fileName', [upload], userController.getImage);// N/A

//funciones de admministrador
api.get('/listUsers', [mdAuth.ensureAuth, mdAuth.validRolAdmin], userController.listUser);// YA

module.exports = api;