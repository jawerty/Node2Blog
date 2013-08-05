var mongoose = require("mongoose"),
    ObjectId = mongoose.Schema.ObjectId;

var commentSchema = new mongoose.Schema({
    post_id: {type: ObjectId, ref: "post"},
    name: {type: String, require: true},
    comment: {type: String, required: true},
    date: {type: Date, default: new Date()}
});

module.exports = mongoose.model("comment", commentSchema);