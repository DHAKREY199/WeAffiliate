const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Field = require("./field")
const DefaultFields = require('./defaultFields')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Feed = new Schema({
  label: String,
  values: [String],
  date:String
})
const FeedbackSchema = new Schema({
    feedbackID: {type: Number, unique: true},
    widgetID: {type: Number, required: true},
    feedback: [Feed]
});
FeedbackSchema.plugin(AutoIncrement, {inc_field: 'feedbackID'});
module.exports = mongoose.model("feedback", FeedbackSchema);
