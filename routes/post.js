//PREREQUISITES
var mongoose = require('mongoose');
var CommentModel = require('./../db/model/comment');
var postCache = require("./../cache/postCache");

//Single post view
exports.get = function(req, res){
    var friendLinkTitle = req.params.title;
    var posts = postCache.get();
    var matchedPosts = posts.filter(function(post){
                        return post.friendly_link_title === friendLinkTitle;
                    });

    if (matchedPosts.length == 0){
        console.log("Unable to retrieve post [post-link=%s]", friendLinkTitle);
        //Post does not exist - return 404
        res.status(400);
        res.render("404", {title: "Page not found"});
    }else{
        var post = matchedPosts[0];
        CommentModel.find({'post_id': post._id}).sort({date: "desc"}).exec(function(err, comments){
            if(err){
                console.log("An error occurred when trying to retrieve comments [post-id=%s, error=%s]", req.params.id, err);
                res.status(500);
                res.render("500", {title: "Error"});

            } else{
                comments = comments ? comments : [];
                res.render("post", {title :post.title, post: post, comments: comments, admin:req.session.admin});
            }
        });
    }
}


exports.saveComment = function(req, res){
    var postId = req.params.id;

    if(!postId){
        console.log("No post id provided to save commentWritten");
        res.status(500);
        res.render("500", {title: "Error"});

        return;
    }

    var commentWritten = req.body.comment;
    if(!commentWritten){
        console.log("No comment has been sent [post-id=%s]", postId);
        res.status(500);
        res.render("500", {title: "Error"});

        return;
    }

    var commenterName = req.body.name;
    if(!commenterName){
        console.log("No name was sent [post-id=%s]", postId);
        res.status(500);
        res.render("500", {title: "Error"});

        return;
    }


    postId = mongoose.Types.ObjectId(postId);

    console.log("New commentWritten [post-id=%s, commenter-name=%s, commentWritten=%s]", postId,
        commenterName, commentWritten);

    //Submitting to database
    var newComment = CommentModel({
        post_id: postId,
        name: commenterName,
        comment: commentWritten
    });
    newComment.save(function(err){
        if(err){
            console.log("Unable to save new commentWritten [post-id=%s, error=%s]", req.params.id, err)
            res.status(500);
            res.render("500", {title: "Error"});

        }else{
            //redirecting to post where the comment was just made
            console.log("Successfully saved a comment for post [post-id=%s, commenter-name=%s]", req.params.id, commenterName)
            res.redirect('/post/' + req.params.id + '/' + req.params.friendlyLink);
        }

    });

}