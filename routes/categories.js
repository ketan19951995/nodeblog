var express = require('express');
var router = express.Router();
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://nodeblog:nodeblog123@cluster0-ivuwy.mongodb.net/nodeblog?retryWrites=true'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

router.get('/show/:category', function(req, res, next) {
	var posts =db.collection('categories');

	posts.find({category: req.params.category},{},function(err, posts){
		res.render('index',{
  			'title': req.params.category,
  			'posts': posts
  		});
	});
});

router.get('/add', function(req, res, next) {
	res.render('addcategory',{
  		'title': 'Add Category'	
	});
});

router.post('/add', function(req, res, next) {
  // Get Form Values
  var name = req.body.name;

  	// Form Validation
	req.checkBody('name','Name field is required').notEmpty();

	// Check Errors
	var errors = req.validationErrors();

	if(errors){
		res.render('addpost',{
			"errors": errors
		});
	} else {
		  data  = {
			"name": name, 
		  };
		db.collection('categories').insert(data , function(err,collection){
		 if(err){
				res.send(err);
			} else {
				req.flash('success','Category Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

module.exports = router;