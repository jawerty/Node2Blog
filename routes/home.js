//PREREQUISITES
var mongoose = require('mongoose');
var db 		 = require('../db');
var post = mongoose.model('post');

//Homepage functions
exports.index = function(req, res){	

  	post.find({}).sort('-_id').execFind(function(err, posts){
  		if(posts){
  			res.render('home', { title: t, subTitle:st, posts:posts, admin:req.session.admin});
  		}else{
  			res.render('home', { title: t, subTitle:st, posts:null, admin:req.session.admin })
  		}
  	});

};
exports.home_post_handler = function(req, res){
	

	
}
