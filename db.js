//PREREQUISITES
var mongoose = require('mongoose')
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;


//process.env.MONGOHQ_URL is for deploying on heroku
//node2blog can be changed to whatever you want your local database to be called i.e. 'my database'
var db_url = process.env.MONGOHQ_URL || "mongodb://localhost:27017/node2blog", 
    db = mongoose.connect(db_url);

//The MongoDB Schema for your posts

var postSchema = new Schema({
    id: ObjectId,
    title: { type: String },
    title_sub: { type: String },
    content: { type: String },
    date: { type: String }
})

//The MongoDB Schema for your each post's comments
var commentSchema = new Schema({
	id: ObjectId,
	postid: { type: String },
    title_sub: { type: String },
	name: { type: String },
	comment: { type: String },
	date: { type: String }
})


var post = db.model('post', postSchema);
var comment = db.model('comment', commentSchema);
