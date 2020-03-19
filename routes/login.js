const express = require('express');
const session = require('express-session');
const router = express.Router();
const path = require('path');
const mongo = require('mongodb').MongoClient;
const assert = require('assert');
router.use(express.urlencoded())
var url = "mongodb://localhost:27017/User";

var sess;
router.get('/',(req,res) => {
    sess = req.session;
    if(sess.email) {
        return res.redirect('/index');
    }
    res.sendFile(path.join(__dirname+'../../public/login.html'));
});

router.post('/validate',(req,res) => {
    sess = req.session;
    sess.email = req.body.email;
    console.log(sess.email);
    var email = req.body.email;
    var password = req.body.password;
    mongo.connect(url,function(err,db) {
        // assert.equal(null,err);
        // var dbo = db.db("mydb");
        db.collection('Users').findOne({email:req.body.email},function(err, result){
            console.log(result.email);
            if(result === null){
                res.end("Login Invalid");
            }
            else if(result.email === email && result.password === password){
                res.end('done');
            }
            else{
                console.log("Wrong Credentials");
                res.end("Login Invalid");
            }
        });
    })
    // if(username == "root" && password=="password")
    // {
    //     console.log('Login Succesfull')
    //     res.redirect('/index');
    // }
    // else{
    //     console.log('Login Unsuccesfull')
    //     res.redirect('/');
    // }
    //res.end('done');
});


module.exports = router;