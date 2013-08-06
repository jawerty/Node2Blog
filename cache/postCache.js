var PostModel = require('./../db/model/post');

function PostCache(){}

PostCache.prototype = {}

var app = null;
var posts = null;

PostCache.prototype.loadPosts = function(callback){
    PostModel.find({}).sort({date: "desc"}).execFind(function(err, blogPosts){
        if(err){
            process.nextTick(function(){
                callback(true);
            })
        }else{
            posts = blogPosts ? blogPosts : [];
            if(app){
                app.locals.posts = posts;
            }
            callback(false, posts);
        }
    });
}

PostCache.prototype.setApp = function (application){
    app = application;
}

PostCache.prototype.get = function(){
    return posts;
}

var cache = new PostCache();

module.exports = cache;
