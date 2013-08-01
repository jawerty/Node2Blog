//Prerequisites 
var mongoose = require('mongoose');
var PostModel = require('./../db/model/post');

var error;
var date 	 = new Date();

//new post functions
exports.new = function(req, res){
  if(req.session.admin == 'true'){
    PostModel.find({}).sort({date: "desc"}).execFind(function(err, posts){
        //TODO: Handle errors gracefully
        res.render("admin_view", {posts: posts, admin:req.session.admin});


//      if(posts){
//        res.render('admin', { title: "TEST", subTitle: "TEST", posts:posts, admin:req.session.admin});
//      }else{
//        res.render('admin', { title: "TEST", subTitle: "TEST", posts: [], admin:req.session.admin })
//      }
    });    
  }else{
    res.redirect('/') 
  }

};


exports.createNewPost = function(req, res){
  //TODO: Perform some kind of input validation here

  var title = req.body.title;
  var title_sub = title.split(' ').join('-');

  var body = req.body.body;
  
  //Submitting to database
  var newPost = new PostModel({
    title: title,
    title_sub: title_sub,
    content: body
  });

  newPost.save(function(err){
      if(err){
          //TODO: Gracefully handle this error
          console.log("An error occurred while trying to save post [post-title=%s, error=%s]", title, err);
      }else{
          console.log("Successfully saved new post [post-title=%s]", title);
      }

      //redirecting to homepage
      res.redirect('/');
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
    console.log('edited post complete')
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
