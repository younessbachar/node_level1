const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
 

// define the Schema (the structure of the article)
const authUserSchema = new Schema({
  profileImage: String,
  username: String,
  email: String,
  password: String,
  customerInfo:[{
    firstname : String,
    lastname : String,
    email : String,
    phoneNumber : String,
    age : Number,
    country : String,
    gender : String,
    createdAt : Date ,
    updatedAt : { type: Date, default: Date.now }
}],
});
 

/// hashing password
authUserSchema.pre("save", async function (next) {
 const salt = await bcrypt.genSalt();
 this.password = await bcrypt.hash(this.password, salt);
 next();
});
 
// Create a model based on that schema
const authUser = mongoose.model("user", authUserSchema);
 
 
// export the model
module.exports = authUser;