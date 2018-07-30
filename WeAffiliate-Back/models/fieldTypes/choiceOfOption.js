const mongoose = require("mongoose");
const Schema = mongoose.Schema

module.exports = new Schema({
  label: {type: String, maxlength: 30, required: true},
  isMandatory: {type: Boolean, default: false},
  answerChoice: [ String ],
  allowMultipleAnswer: {type: Boolean, default: false},
  displayOption: {type: Boolean, default: false}, //Horizontal=0 , Vertical = 1
  selectedAnswer: [ String ]
});
