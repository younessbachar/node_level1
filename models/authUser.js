const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
 

// define the Schema (the structure of the article)
const authUserSchema = new Schema({
  username: String,
  email: String,
  password: String,
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