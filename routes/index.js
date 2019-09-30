var express = require('express');
var router = express.Router();
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://nodeblog:nodeblog123@cluster0-ivuwy.mongodb.net/nodeblog?retryWrites=true'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 



/* GET home page. */
router.get('/', function(req, res, next) {
   db.collection('posts').find({}).toArray(function(err, posts) {
	res.render('index', { posts: posts });
	});
});

module.exports = router;