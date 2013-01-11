//PREREQUISITES
var mongoose = require('mongoose');
var db 		 = require('../db');
var post = mongoose.model('post');
var commentss = mongoose.model('comment');
var date 	 = new Date();

//Single post view
exports.post_view = function(req, res){

	id = req.params.id;
	post.find({'_id': id}, function(err, post){
      if(post){
      	commentss.find({'postid': id}, function(err, comment){
      		if(comment){
      			res.render('post_view', {title:t, subTitle:st, post:post, comment:comment, admin:req.session.admin})
      		}else{
      			res.render('post_view', {title:t, subTitle:st, post:post, comment:null, admin:req.session.admin})
      		}
      	});
        
      }else{
        res.render('post_view', {title:t, subTitle:st, post:null, comment:null, admin:req.session.admin})
      }
    });
}
exports.post_view_post_handler = function(req, res){
	id = req.params.id;
	title_sub = req.params.title;
	name = req.body.name || 'anon';
	comment = req.body.comment || 'Nothing';
	console.log(name + ' said ' + comment);
	console.log(id);


	//specific time
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var seconds = date.getSeconds();
	  //date
	  var month = date.getMonth() + 1;
	  var year = date.getFullYear();
	  var day = date.getDate();


	  //organize time so it looks nice
	  var time = month + '/' + day + '/' + year + ' at ' + hours + ':' + minutes + ':' + seconds;


	  //Submitting to database
	  var newComment = commentss({
	  	postid: id,
	  	title_sub: title_sub,
	    name: name,
	    comment: comment,
	    date: time
	  });
	  newComment.save();

	  //redirecting to homepage
	  res.redirect('/post/' + id + '/' + title_sub);
}