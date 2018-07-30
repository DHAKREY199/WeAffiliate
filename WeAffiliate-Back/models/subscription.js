const mongoose = require("mongoose");
const Schema = mongoose.Schema


module.exports = new Schema({
    expiryDate: Date,
    active: Boolean
});
