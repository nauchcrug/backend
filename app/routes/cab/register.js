/*
    Файл роута для регистрации пользователя
 */

var express = require('express');
var router = express.Router();

//Сразу подключим модель User

var user = require('../');
