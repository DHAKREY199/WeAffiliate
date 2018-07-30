const mongoose = require("mongoose");
const Schema = mongoose.Schema

module.exports = new Schema({
    text: {type: String, default: "Feedback"},
    textColor: String,
    backgroundColor: String,
    borderColor: String,
    feedbackTabAlignment: {type: Boolean, default: true}  // 0 for left and 1 for right
});
