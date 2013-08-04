//PREREQUISITES
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


//process.env.MONGOHQ_URL is for deploying on heroku
//node2blog can be chagens to whatever you want your local database to be called i.e. 'my database'
var db_url = process.env.MONGOHQ_URL || "mongodb://localhost:27017/your_database_name", 
    db = mongoose.connect(db_url);

