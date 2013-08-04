var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.ObjectId;

var PostSchema = new mongoose.Schema({
    title: {type: String, required: true, index: {unique: true}},
    friendly_link_title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: new Date()}
});

module.exports = mongoose.model("post", PostSchema);