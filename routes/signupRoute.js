const express = require('express');
const router = express.Router();

///authUser model
const authUser =  require('../models/authUser');
const { render } = require('ejs');

router.get("/signup",(req,res)=>{
    res.render("Auth/signup")
})

router.post("/signup",async (req,res)=>{
    try{
        const result = await authUser.create(req.body)
        console.log(result)
        res.render("Auth/signup")
    }catch(error){
      console.log(error)
    }
})

module.exports = router;