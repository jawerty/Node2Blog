//Prerequisites 
var mongoose = require('mongoose');
var db 		 = require('../db');
var post = mongoose.model('post');
var error;
var date 	 = new Date();

 function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
  }
  
//new post functions
exports.new = function(req, res){
  if(req.session.admin == 'true'){
    post.find({}).sort('-_id').execFind(function(err, posts){
      if(posts){
        res.render('admin', { title: title, subTitle:subTitle, posts:posts, admin:req.session.admin});
      }else{
        res.render('admin', { title: title, subTitle:subTitle, posts:null, admin:req.session.admin })
      }
    });    
  }else{
    res.redirect('/') 
  }

};
exports.new_post_handler = function(req, res){
  
  //specific time
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  //date
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var day = date.getDate();

  //organize time so it looks nice
  var time = month + '/' + day + '/' + year + " at " + formatAMPM(date);
  var title = req.body.title;
  var title_sub = title.split(' ').join('-');
  

  var body = req.body.body;
  
  //Submitting to database
  var newPost = post({
    title: title,
    title_sub: title_sub,
    content: body,
    date: time
  });
  newPost.save();

  //redirecting to homepage
  res.redirect('/');
};

//deleting posts functions
exports.delete = function(req, res){
    if (req.session.admin == 'true'){
      post.find({}).sort('-_id').execFind(function(err, posts){
      if(posts){
        res.render('admin_delete', { title: title, subTitle:subTitle, posts:posts, admin:req.session.admin});
      }else{
        res.render('admin_delete', { title: title, subTitle:subTitle, posts:null, admin:req.session.admin })
      }
      });
    }else{
      res.redirect('/')
    }
};
exports.delete_post_handler = function(req, res){
  var title1 = req.body.title;
  var time = req.body.time;
  console.log(title);
    post.findOne({"title": title1 , "date":time}, function(err, match){
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
    post.findOne({_id: req.params.id}, function(err, post){
      if(post){
        res.render('admin_edit', {title: title, subTitle:subTitle, post:post, admin:req.session.admin})
      }else{
        res.redirect('/admin')
      }
    })
  }else{
    res.redirect('/')
  }
};
exports.admin_edit_post_handler = function(req, res){
  body = req.body.body;
  title1 = req.body.title;

  post.findOne({title: title1}, function(err, post){
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
  if (password1 == password){
    console.log('password1 is password')
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
