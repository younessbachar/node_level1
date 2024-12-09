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
    
    const loginUser = await authUser.findOne({$or: [{ email: req.body.email},{username: req.body.email}]})
    if(!loginUser){
        res.json({invalidemail: "wrong email"})
    
    }else{
        const match = await bcrypt.compare(req.body.password, loginUser.password)
        if(match){
            console.log("correct email & password");
            var token = jwt.sign({id: loginUser._id}, process.env.JWT_SECRET_KEY)
            res.cookie("jwt", token, {httpOnly: true, maxAge: 86400000})
           res.json({id: loginUser._id})
        }else{
            res.json({invalidpassword: "wrong password"})
        }
}
})

module.exports = router;

