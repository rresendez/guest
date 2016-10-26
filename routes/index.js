var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var message = req.body.message;

    // Set our collection
    var collection = db.get('guest');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail,
        "message": message
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});
module.exports = router;
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('guest');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
router.get('/search', function(req, res) {
    var db = req.db;
    var collection = db.get('guest');
    var id ="testuser2@testdomain.com";

    collection.find({email: {$eq: id}},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
router.post('/search', function(req, res) {

    // Set our internal DB variable


    // Get our form values. These rely on the "name" attributes
    var userName = req.body.id;


    // Set our collection
    var collection = db.get('guest');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail,
        "message": message
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET New User page. */
router.get('/newmessage', function(req, res) {
    res.render('newmessage', { title: 'Add New Message' });
});
