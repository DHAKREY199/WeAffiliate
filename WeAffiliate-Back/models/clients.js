const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema
const Subscription = require('./subscription')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ClientSchema = new Schema({
    firstname : {type : String},
    lastname : {type : String},
    username: {type: String, match: /^([a-zA-Z]+\s?)*$/},
    password: {type: String, match: /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\.\_\!\@]{8,}/},
    clientID: {type: Number, unique: true},
    email: { type: String, match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/},
    phoneNo: String,
    organizationName: String,
    subscriptionDetail: {type: Subscription, required: true},
    widgets : [Number],
    city: {type: String},
    country:{type:String}
});

// const ClientSchema = new Schema({
//     username: String,
//     password: String,
//     clientID: Number,
//     email: String,
//     phoneNo: String,
//     organizationName: String,
//     subscriptionDetail: Subscription,
// });

ClientSchema.plugin(passportLocalMongoose);
ClientSchema.plugin(AutoIncrement, {inc_field: 'clientID'});

module.exports = mongoose.model("client", ClientSchema);
