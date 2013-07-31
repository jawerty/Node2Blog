//PREREQUISITES

var PostModel = require('./../db/model/post');

//Homepage functions
exports.index = function(req, res){

  	PostModel.find({}).sort({date: "desc"}).execFind(function(err, posts){
  		//TODO: Handle errors gracefully
        if(!posts){
  			console.log("No posts found");
            posts = [];

  		}
        res.render("index", {pageTitle: "Blog test", blogTitle: "Kenshiro Blog", subTitle: "Hackuto stuff", posts: posts});
  	});

};


exports.home_post_handler = function(req, res){
	

	
}
