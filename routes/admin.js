//Prerequisites 
var mongoose = require('mongoose');
var PostModel = require('./../db/model/post');
var CommentModel = require("./../db/model/comment");
var postCache = require("./../cache/postCache");

var error;
var date 	 = new Date();

//new post functions
exports.new = function(req, res){
  if(req.session.admin == 'true'){
    res.render("admin_view", {admin:req.session.admin});
  }else{
    res.redirect('/') 
  }

};


exports.createNewPost = function(req, res){
  var title = req.body.title;
  if(!title || title.length == 0){
      console.log("Post title provided is either null or empty. Returning an error message");
      res.status(500);
      res.render("500", {title: "Error"});
      return;
  }

  var friendly_link_title = title.split(" ").join("-");
  friendly_link_title = encodeURI(friendly_link_title);

  var body = req.body.body;
  if(!body || body.length == 0){
      console.log("Post content provided is either null or empty. Returning an error message");
      res.status(500);
      res.render("500", {title: "Error"});
      return;
  }
  
  //Submitting to database
  var newPost = new PostModel({
    title: title,
    friendly_link_title: friendly_link_title,
    content: body
  });

  newPost.save(function(err){
      if(err){
          console.log("An error occurred while trying to save post [post-title=%s, error=%s]", title, err);
          res.status(500);
          res.render("500", {title: "Error"});
      }else{
          console.log("Successfully saved new post [post-title=%s]", title);
          postCache.loadPosts(function(err, posts){
              if(err){
                  console.log("Unable to reload posts after saving a new one [error=%s]", err);
                  res.status(500);
                  res.render("500", {title: "Error"});
              }else{
                  console.log("Successfully reloaded posts [number-of-posts=%d]", posts.length);
                  res.redirect('/');
              }
          });

      }
  });

};

//deleting posts functions
exports.showPostsToEditOrDelete = function(req, res){
    if (req.session.admin == 'true'){
        res.render('admin_edit_delete', { title: "Edit Or Delete Posts", subTitle: "Edit Or Delete Posts", posts: postCache.get(), admin:req.session.admin});
    }else{
      res.redirect('/')
    }
};


exports.deletePost = function(req, res){
  var identifier = mongoose.Types.ObjectId(req.params.id);
  if(!identifier){
      res.status(500);
      res.render("500", {title: "Error while trying to delete post."});
      return;
  }

    var postToDelete = postCache.get().filter(function(post){
        return post._id.equals(identifier);
    });

    if(!postToDelete || postToDelete.length != 1){
        res.status(500);
        res.render("500", {title: "Error: post to delete not found"});
    }else{
        postToDelete = postToDelete[0];
        CommentModel.remove({post_id: identifier}, function(err){
            if(err){
                console.log("An error occurred while trying to delete comments [error=" + err + "]");
            }
            //Now delete the post
            postToDelete.remove(function(err){
                if(err){
                    console.log("Unable to remove post [id=" + identifier + "]");
                }else{
                    console.log("Succesfully deleted post with title: " + postToDelete.title);
                }
                postCache.loadPosts(function(err, postsLoaded){
                    res.redirect("/");
                });
            });
        });
    }
};
exports.admin_edit = function(req, res){
  if (req.session.admin == 'true'){
    PostModel.findOne({_id: req.params.id}, function(err, post){
      if(post){
        res.render('admin_edit', {title: t, subTitle:st, post:post, admin:req.session.admin})
      }else{
        res.redirect('/admin')
      }
    })
  }else{
    res.redirect('/')
  }
};

exports.editAndSavePost = function(req, res){
    var identifier = mongoose.Types.ObjectId(req.params.id);
    if(!identifier){
        res.status(500);
        res.render("500", {title: "Error while trying to edit post."});
        return;
    }

    PostModel.update({_id: identifier}, {$set: { content: req.body.body }}, function(err){
        if(err){
            console.log("An error occurred when trying to update document [id= " + identifier + "]");
            res.status(500);
            res.render("500", {title: "Error while trying to save edited post."});
            return;
        }else{
            console.log("Successfully updated post with [id=" + identifier + "]")
            postCache.loadPosts(function(err, posts){
                if(err){
                    console.log("Unable to reload posts after saving a new one [error=%s]", err);
                    res.status(500);
                    res.render("500", {title: "Error"});
                }else{
                    console.log("Successfully reloaded posts [number-of-posts=%d]", posts.length);
                    res.redirect('/');
                }
            });
        }
    }) ;

}

exports.showPostToEdit = function(req, res){
    var identifier = mongoose.Types.ObjectId(req.params.id);
    if(!identifier){
        res.status(500);
        res.render("500", {title: "Error while trying to edit post."});
        return;
    }

    var postToEdit = postCache.get().filter(function(post){
        return post._id.equals(identifier);
    });

    if(!postToEdit || postToEdit.length != 1){
        res.status(500);
        res.render("500", {title: "Error: post to edit not found"});
    }else{
        postToEdit = postToEdit[0];
        res.render("admin_edit", {post: postToEdit});
    }
}


//admin check functions
exports.admin_check_post_handler = function(req, res){
  var password1 = req.body.password;
  var password2 = req.body.passwordconfirm;
  console.log('passed')
  if (password1 == p){
    console.log('password1 is p')
    if(password1 == password2){
      console.log('password1 is password2')
      req.session.admin = 'true';
      res.redirect('/admin/new')
    }else{

      error = 'Passwords do not match';
      console.log(error)
      res.redirect('/admin')
    }
  }else{
    error = 'Wrong Password';
    console.log(error)
    res.redirect('/admin');
  }
};
exports.admin_check = function(req, res){

  res.render('admin_check', {error:error});
};
