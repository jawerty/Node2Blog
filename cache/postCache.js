var PostModel = require('./../db/model/post');

function PostCache(){}

PostCache.prototype = {}

var app = null;
var posts = null;

PostCache.prototype.loadPosts = function(callback){
    PostModel.find({}).sort({date: "desc"}).execFind(function(err, posts){
        if(err){
            process.nextTick(function(){
                callback(true);
            })
        }else{
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

var cache = new PostCache();

module.exports = cache;
