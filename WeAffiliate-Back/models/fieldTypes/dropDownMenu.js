const mongoose = require("mongoose");
const Schema = mongoose.Schema

module.exports = new Schema({
  label: {type: String, maxlength: 30, required: true},
  isMandatory: {type: Boolean, default: false},
  defaultTextForDropdown:String,
  choices: [String],
  allowMultipleAnswer: Boolean,
  selectedChoice: [String]
});
