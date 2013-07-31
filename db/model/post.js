var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.ObjectId;

var PostSchema = new mongoose.Schema({
    title: {type: String, required: true, index: {unique: true}},
    //TODO: Is this really needed? No in my opinion. Posts only have a title, sub-titles are useless
    title_sub: String,
    content: {type: String, required: true},
    date: {type: Date, default: new Date()}
});

module.exports = mongoose.model("post", PostSchema);