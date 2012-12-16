
var mongoose = require('mongoose')
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

//process.env.MONGOHQ_URL is for deploying on heroku
//node2blog can be chagens to whatever you want your local database to be called i.e. 'my database'
var db_url = process.env.MONGOHQ_URL || "http://localhost:27017/node2blog", 
    db = mongoose.connect(db_url);

//The MongoDB Schema for your posts

var postSchema = new Schema({
    id: ObjectId,
    title: String,
    content: String,
    date: String
})

var commentSchema = new Schema({
	id: ObjectId,
	postid: String,
	name: String,
	comment: String,
	date: String
})
var post = db.model('post', postSchema);
var comment = db.model('comment', commentSchema);