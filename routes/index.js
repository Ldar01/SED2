var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var upload    = require('./upload');
var mongoose  = require('mongoose');
var Photo     = mongoose.model('Photos');
var passport = require('passport');
// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));


// route for logout action
router.get('/logout', auth.logout);

//rout for upload page
//router.get('/upload',auth.upLoad);

//rout for superadmin page
router.get('/super',auth.adminSuper);

router.get('/upload/', function(req, res, next) {

  Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, photos) {
    res.render('upload', { title: 'NodeJS file upload tutorial', msg:req.query.msg, photolist : photos });
    
  });

});

/** Upload file to path and add record to database */

router.post('/upload/', auth.uploadFile);

module.exports = router;
