 //change the title variable to your blog title
 //change the subTitle variable to your blog sub-title
 //change the password variable to your admin password
 
 title = 'Node2Blog';
 subTitle = 'A simple blog made in Node.js'
 password = 'narwhal';
 author = 'Unknown';
 icon = 'file_name.ico';
 var siteUrl, imageUrl;
 
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var db     = require('./db');
var post_model = mongoose.model('post');
var rss = require('rss');
var feedTime = null;



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
var feedXml = "";

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
  siteUrl = 'http://localhost:'+app.get('port')+'/';
  imageUrl = siteUrl+'images/'+icon;
  app.use(express.errorHandler());
});

app.configure('production', function(){
  siteUrl = 'http://'+req.host+'/';
  imageUrl = siteUrl+'images/'+icon;
  app.use(express.errorHandler()); 
});

app.get('/', home.index);
app.post('/', home.home_post_handler);

app.get('/admin/delete', admin.delete);
app.post('/admin/delete', admin.delete_post_handler);

app.get('/admin/new', admin.new);
app.post('/admin/new', admin.new_post_handler);

app.get('/post/:id/:title', post.post_view);
app.post('/post/:id/:title', post.post_view_post_handler);

app.get('/admin', admin.admin_check);
app.post('/admin', admin.admin_check_post_handler);

app.get('/admin/:id/edit', admin.admin_edit);
app.post('/admin/:id/edit', admin.admin_edit_post_handler);

app.get('/admin/logout', function(req,res){
  delete req.session.admin;
  console.log('logged-out')
  res.redirect('/');
});

app.get('/about', function(req, res) {
  res.render('about', { title: title, subTitle:subTitle, admin:req.session.admin});   
});

/*RSS Feed optimization*/
app.get('/rss.xml', function(req, res) {
  //cache for 10 minutes
  if (!feedTime || ((new Date()).getTime() - feedTime.getTime() > 600000)) {
    var feed = new rss({
      title: title,
      description: subTitle,
      feed_url: siteUrl + 'rss.xml',
      site_url: siteUrl,
      image_url: imageUrl,
      author: author
    });
    
    post_model.find({}).sort('-_id').execFind(function(err, posts){
      if (posts) {
        posts.forEach(function(entry) {
          var delimiterIndex = entry.date.indexOf(" at "); //date is not JS-parse-able
          var date = entry.date.substring(0, delimiterIndex);
          feed.item({
            title: entry.title,
            description: entry.content,
            url: siteUrl + 'post/' + entry._id + '/' + entry.title_sub,
            date: date
          });
        });
        feedXml = feed.xml();
        feedTime = new Date();
        res.send(feedXml);
      }
    });
  } else {
    res.send(feedXml);
  }
});


//Server start
http.createServer(app).listen(app.get('port'), function(){
  console.log("Your blog is running on port " + app.get('port'));
});
