//PREREQUISITES
var mongoose = require('mongoose');
var PostModel = require("./../db/model/post");
var CommentModel = require('./../db/model/comment');

//Single post view
exports.get = function(req, res){
    var identifier = mongoose.Types.ObjectId(req.params.id);

	PostModel.findById(identifier, function(err, post){
        if(err){
            console.log("Unable to retrieve post [post-id=%s]", req.params.id);
            res.status(500);
            res.render('500');
        }else if(post){
      	  //TODO: Get the comments associated with the post
//          CommentModel.find({'post_id': identifier}, function(err, comment){
//      		if(err){
//                console.log("An error occurred when trying to retrieve comments [post-id=%s]", req.params.id);
//            } else{

      			res.render("post", {title :post.title, post: post, comments:[], admin:req.session.admin});
//      		}
//      	});
        
      }else{
            //Post does not exist - return 404
            res.status(400);
            res.render("404");
      }
    });
}




exports.saveComment = function(req, res){
    if(!req.body.comment){
        //TODO: We should handle this error case properly when no comment is sent
        console.log("No comment has been sent!");
        res.redirect("/");
    }else{
        var commentWritten = req.body.comment;
        var postId = mongoose.Types.ObjectId(req.params.id);
        var commenterName = req.body.name || 'anon';
        var title = req.params.title;

        console.log("New comment [post-id=%s, commenter-name=%s, comment=%s]", req.params.id,
            commenterName, commentWritten);

        //Submitting to database
        var newComment = CommentModel({
            post_id: postId,
            title: title,
            name: commenterName,
            comment: commentWritten
        });
        newComment.save(function(err){
            if(err){
                //TODO: Gracefully handle this error in the future
                console.log("Unable to save new comment [post-id=%s, error=%s]", req.params.id, err)
            }

            //redirecting to homepage
            res.redirect('/post/' + req.params.id + '/' + req.params.title);
        });


    }
}