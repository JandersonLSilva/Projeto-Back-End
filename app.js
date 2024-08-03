const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const cookieParser = require('cookie-parser');

require("dotenv").config();

const { urlencoded } = require('body-parser');
app.use(express.urlencoded({ extended: true }));

const mustacheExpress = require("mustache-express");
const engine = mustacheExpress();
app.engine("mustache", engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(cookieParser());

const session = require("express-session");
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}));

const Joi = require('joi')


module.exports = app;