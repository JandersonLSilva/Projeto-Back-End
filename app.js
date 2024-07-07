const express = require('express');
const app = express();
const path = require('path');
const { urlencoded } = require('body-parser');
const mustacheExpress = require("mustache-express");
const cookieParser = require('cookie-parser');
const engine = mustacheExpress();
const session = require("express-session");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'views')));

app.engine("mustache", engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));



module.exports = app;