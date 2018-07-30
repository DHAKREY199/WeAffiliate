const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DateSchema = require('./fieldTypes/date');
const Rating = require('./fieldTypes/rating');
const TextBox = require('./fieldTypes/textBox');
const DropDownMenu = require('./fieldTypes/dropDownMenu');
const CommentBox = require('./fieldTypes/commentBox');
const ChoiceOfOptions = require('./fieldTypes/choiceOfOption');

module.exports = new Schema({
  fieldType: {type: String, enum: ['dropDownMenu', 'textBox', 'rating', 'date', 'comment', 'choiceOfOption'] },
  label: {type: String, maxlength: 50, required: true},
  isCategorySpecific : {type: Boolean, default: false},
  categories: [String],
  dropDownMenu: DropDownMenu,
  textBox: TextBox,
  rating: Rating,
  date: DateSchema,
  comment: CommentBox,
  choiceOfOption: ChoiceOfOptions
});
