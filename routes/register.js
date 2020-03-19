const express = require('express');
const router = express.Router();
const path = require('path');
const { check, validationResult } = require('express-validator');
router.use(express.urlencoded())
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
var url = "mongodb://localhost:27017/"


router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'../../public/register.html'));
});

router.post('/add',(req,res) => {
    //const errors = validationResult(req);
    //if(!errors.isEmpty())
        //res.redirect('/register');
    //req.check('email','Invalid email address').isEmail();
    //req.check('password','Invalid password').isLength({min:5}).equals(req.body.cpassword);
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    console.log(username);
    var details ={
        username:username,
        email:email,
        password:password,
        cpassword:cpassword
    };
    console.log(details);
    /*
    mongo.connect(url,function(err,db) {
        assert.equal(null,err);
        var dbo = db.db("mydb");
        dbo.collection('Users').insertOne(function(err, result){
            assert.equal(null,error);
            console.log('User added');
        });
    })
    */
    res.redirect('/');
});

module.exports = router;