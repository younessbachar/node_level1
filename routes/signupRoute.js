const express = require('express');
const router = express.Router();


///authUser model
const authUser =  require('../models/authUser');

router.get("/signup",(req,res)=>{
    res.render("Auth/signup")
})

router.post("/signup",async (req,res)=>{
    
    const signupUser = await authUser.findOne({email: req.body.email, username: req.body.username})
    if(!signupUser){
    authUser.create(req.body)
    try{
        console.log("user created");
        res.redirect("/login")

    }catch(error){
      console.log(error)
    }}else{
        console.log("username or email alredy existed");
        res.redirect("/signup")
    }
})

module.exports = router;