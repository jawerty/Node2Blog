//Prerequisites 
var mongoose = require('mongoose');
var PostModel = require('./../db/model/post');
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
exports.delete = function(req, res){
    if (req.session.admin == 'true'){
      PostModel.find({}).sort('-_id').execFind(function(err, posts){
      if(posts){
        res.render('admin_delete', { title: "Test", subTitle: "TEST", posts:posts, admin:req.session.admin});
      }else{
        res.render('admin_delete', { title: "Test", subTitle: "TEST", posts:null, admin:req.session.admin })
      }
      });
    }else{
      res.redirect('/')
    }
};


exports.deletePost = function(req, res){
  var title = req.body.title;
  var time = req.body.time;
  console.log(title);
    PostModel.findOne({"title": title , "date":time}, function(err, match){
      if(match){
        match.remove()
        console.log('removed')
        res.redirect('/admin/delete')
      }else{
        res.redirect('/')
      }
    });
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
exports.editPost = function(req, res){
  body = req.body.body;
  title = req.body.title;

  PostModel.findOne({title: title}, function(err, post){
    post.content = body;
    post.save()
    console.log('edited post complete');
    res.redirect('/')
  })
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
