const mongoose = require('mongoose');

const Schema = mongoose.Schema

const customerSchema = new Schema({
    firstname : String,
    lastname : String,
    email : String,
    phoneNumber : String,
    age : Number,
    country : String,
    gender : String,
},
{timestamps: true});

const Customer = mongoose.model("Mydata",customerSchema)

module.exports = Customer