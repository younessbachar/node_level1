const express = require('express');
const router = express.Router();
const authUser = require("../models/authUser")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

///get request
router.get("/login",(req,res)=>{
    res.render("Auth/login")
})


///post request
router.post("/login", async (req,res)=>{
    
    const loginUser = await authUser.findOne({email: req.body.email})
     console.log(loginUser);
    if(!loginUser){
        console.log("email not found");
        res.render("Auth/login")
    }else{
        const match = await bcrypt.compare(req.body.password, loginUser.password)
        if(match){
            console.log("correct email & password");
            var token = jwt.sign({id: loginUser._id}, "12345")
            res.cookie("jwt", token, {httpOnly: true, maxAge: 86400000})
            res.redirect("/home")
        }else{
            console.log("wrong password");
            res.render("Auth/login")
         }
}
})

module.exports = router;

