//PREREQUISITES
var mongoose = require('mongoose')
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;


//process.env.MONGOHQ_URL is for deploying on heroku
//node2blog can be chagens to whatever you want your local database to be called i.e. 'my database'
var db_url = process.env.MONGOHQ_URL || "mongodb://localhost:27017/your_database_name", 
    db = mongoose.connect(db_url);

//The MongoDB Schema for your posts

var postSchema = new Schema({
    id: ObjectId,
    title: String,
    title_sub: String,
    content: String,
    date: String
})

//The MongoDB Schema for your each post's comments
var commentSchema = new Schema({
	id: ObjectId,
	postid: String,
    title_sub: String,
	name: String,
	comment: String,
	date: String
})


var post = db.model('post', postSchema);
var comment = db.model('comment', commentSchema);