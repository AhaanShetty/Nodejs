const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var multerStorage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,'../my_uploads'));
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
});

var multerSingleFile = multer({ 
    storage:multerStorage,
});

var sess;

router.get('/',(req,res) => {
    sess = req.session;
    if(sess.email) {
        //res.write(`<h1>Hello ${sess.email} </h1><br>`);
        console.log("File");
        const uploadStatus = req.app.locals.uploadStatus;
        req.app.locals.uploadStatus = null;
        var wel = "Welcome " + sess.email;
        res.render('file_upload',{
            title:wel,
            uploadStatus : uploadStatus
        });
        //res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }    
});

router.post("/singleFile", multerSingleFile.single('singleFile'), function(req, res) {
    const file = req.file
    if (!file) {
        return res.end("Please choose file to upload!");
    }
    req.app.locals.uploadStatus = true;
    res.redirect('/index');
});

var multerMultipleUpload = multer({ storage: multerStorage }).array("multipleFiles", 5);
router.post("/multipleFile", function(req, res) {
    multerMultipleUpload(req, res, function(err) {
        if (err) {
            return res.end("Files uploading unsucessfully!");
        }
        req.app.locals.uploadStatus = true;
        res.redirect('/index');
    });
});

const imgUpload = multer({
    storage:multerStorage,
    limits : {fileSize:100000},
    // fileFilter : function(req,file,cb){
    //     checkFileType(file,cb);
    // }
}).single('singleImage');

//Check filetype
function checkFileType(file,cb){
    const filetypes = /jpeg | jpg | png | gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetypes = filetypes.test(file.mimetype);
    if( mimetypes && extname){
        return cb(null,true);
    }else{
        cb('Error images only');
    }
}


router.post('/singleImage',(req,res) =>{
    imgUpload(req,res, err => {
        if(err){
            res.render('file_upload',{
                title:'Upload Files',
                msg : err
            });
        }else{
            if(req.file == undefined ){
                res.render('file_upload',{
                    title:'Upload Files',
                    msg: "No file selected"
                });
            }else{
                req.app.locals.uploadStatus = true;
                res.redirect('/index');
                // res.render('file_upload',{
                //     title:'Upload Files',
                //     msg: "File uploaded !",
                //     file  : `my_uploads/${req.file.filename}`
                // });
                
            }
        }
    });
});

router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});

module.exports = router;