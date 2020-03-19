const express = require('express');
var login = require('./routes/login');
var about = require('./routes/about');
var register = require('./routes/register');
var index = require('./routes/index');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',login);
app.use('/about',about);
app.use('/register',register);
app.use('/index',index);
app.use(function(req,res){
    res.status(404).send('404 Error');
});

module.exports = app;