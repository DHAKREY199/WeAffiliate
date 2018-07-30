const mongoose = require("mongoose");
const Schema = mongoose.Schema

const Name = new Schema ({
  typeOfField : {type: String, enum: ['mandatory', 'hidden', 'optional'], default: 'mandatory'} ,
  label : {type: String, maxlength: 30},
  value : String
})

const Email = new Schema ({
  typeOfField: {type: String, enum: ['mandatory', 'hidden', 'optional'], default: 'mandatory' } ,
  label: {type: String, maxlength: 30},
  value: { type: String, match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/}
})

const Message = new Schema({
  typeOfField: {type: String, enum: ['mandatory', 'hidden', 'optional'], default: 'mandatory' } ,
  label: {type: String, maxlength: 30},
  value: String
})

const Category = new Schema({
  typeOfField: {type: String, enum: ['mandatory', 'hidden', 'optional'], default: 'mandatory'} ,
  label: {type: String, maxlength: 30},
  value: String
})

const Screenshot = new Schema({
  typeOfField: {type: String, enum: ['hidden', 'optional'], default: 'hidden'} ,
  label: {type: String, maxlength: 50},
  value: {String}
})

module.exports = new Schema({
  name: Name,
  email: Email,
  message: Message,
  category: Category,
  attachScreenshot: Screenshot
});
