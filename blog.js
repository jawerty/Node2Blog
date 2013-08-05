var blogConfig = require("./config/blogConfig"),
    postCache = require("./cache/postCache"),
    db = require('./db/dbConnection');

console.log("Blog config loaded [name=%s, subtitle=%s]", blogConfig.name, blogConfig.subTitle);

p = blogConfig.password;


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
app.configure(function () {
  app.use(express.logger('dev'));
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'ar4452ihbb34y2b3hu4kvk2u34vu23y4yu324k',
    store: store
  }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);

  //Handling of 404 and 500 pages
  app.use(function(req, res){
      res.status(400);
      res.render("404", {title: "Page not found"});
    });
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

//Setting up "global locals" that will be used across the whole application
app.locals = ({
    blogTitle: blogConfig.name,
    blogSubtitle: blogConfig.subTitle,
    fbAppId: blogConfig.facebookAppId
});


////////get methods////////
app.get('/', home.index);
app.get('/admin/delete', admin.delete);
app.get('/admin/new', admin.new);

app.get('/post/:id/:title', post.get);

app.get('/admin' || '/admin/', admin.admin_check);
app.get('/admin/:id/edit', admin.admin_edit);
app.get('/admin/logout', function (req, res) {
  delete req.session.admin;
  console.log('logged-out')
  res.redirect('/');
});

app.get('/about', function (req, res) {
  res.render('about', {title: "Kenshiro's Hackuto blog - About", admin: req.session.admin});

});


///////post methods////////
app.post('/admin/delete', admin.deletePost);
app.post('/admin/new', admin.createNewPost);
app.post('/admin' || '/admin/', admin.admin_check_post_handler);
app.post('/admin/:id/edit', admin.editPost);
app.post('/', home.home_post_handler);

app.post('/post/:id/:friendlyLink', post.saveComment);



//Load the latest posts
postCache.setApp(app);
postCache.loadPosts(function(err, posts){
    if(err){
        //Cannot start the server as an error occured loading posts
        console.log("An error occurred while trying to load posts [error=%s]", err);
        throw new Error("" + err);
    }else{
        console.log("Loaded %d posts", posts.length);
        //Server start
        var serverPort = blogConfig.port;
        http.createServer(app).listen(serverPort, function () {
            console.log("Your blog is running on port " + serverPort);
        });
    }
})


