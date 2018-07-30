const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Field = require("./field")
const DefaultFields = require('./defaultFields')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Button = require("./button");
const Category = new Schema({
  isDefault: {type: Boolean, default: false},
  name: {type: String, maxlength: 30},
  display: Boolean
});

const WidgetSchema = new Schema({
    widgetID: {type: Number, unique: true},
    buttonSetting: Button,
    categorySetting: [Category],
    defaultFields: {type:DefaultFields, required: true},
    fieldSetting:[Field],
    thankyouMessage: String,
    styleSetting: String
});
WidgetSchema.plugin(AutoIncrement, {inc_field: 'widgetID'});
module.exports = mongoose.model("widget", WidgetSchema);
