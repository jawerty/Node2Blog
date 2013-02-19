 title = 'Node2Blog';
 subTitle = 'A simple blog made in Node.js'
 password = 'narwhal';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var db     = require('./db');
var post = mongoose.model('post');


 //change title to whatever you want your blog to be called
 //change subTitle to whatever you want your blog to be called
 //change password to whatever you want your password to be

 admin = null;
 var error;


var express = require('express')
  , home = require('./routes/home')
  , admin = require('./routes/admin')
  , post = require('./routes/post')
  , http = require('http')
  , path = require('path');

var app = express();
var store = new express.session.MemoryStore;

//MIDDLEWARE
app.configure(function(){
  app.use(express.logger('dev'));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'ar4452ihbb34y2b3hu4kvk2u34vu23y4yu324k',
                            store: store
                             }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

////////get methods////////
app.get('/', home.index);
app.get('/admin/delete', admin.delete);
app.get('/admin/new', admin.new);
app.get('/post/:id/:title', post.post_view);
app.get('/admin' || '/admin/', admin.admin_check);
app.get('/admin/:id/edit', admin.admin_edit);
app.get('/admin/logout', function(req,res){
  delete req.session.admin;
  console.log('logged-out')
  res.redirect('/');
});

app.get('/about', function(req, res) {
  res.render('about', { title: title, subTitle:subTitle, admin:req.session.admin});
      
});

///////////////////////////


///////post methods////////
app.post('/admin/delete', admin.delete_post_handler);
app.post('/admin/new', admin.new_post_handler);
app.post('/admin' || '/admin/', admin.admin_check_post_handler);
app.post('/admin/:id/edit', admin.admin_edit_post_handler);
app.post('/', home.home_post_handler);
app.post('/post/:id/:title', post.post_view_post_handler);

///////////////////////////


//Server start
http.createServer(app).listen(app.get('port'), function(){
  console.log("Your blog is running on port " + app.get('port'));
});
