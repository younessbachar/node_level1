const express = require('express');
const router = express.Router();
const {validationResult ,check } = require("express-validator")

const jwt = require('jsonwebtoken');


///authUser model
const authUser =  require('../models/authUser');

router.get("/signup",(req,res)=>{
    res.render("Auth/signup")
})

router.post("/signup",[
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be at least 8 characters with 1 upper case letter and 1 number").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
 ],async (req,res)=>{
    try{
      const objError = validationResult(req);
      // Array ==> objError.errors
      if (objError.errors.length > 0) {
        return   res.json(   { arrValidationError: objError.errors }    ) 
      }
      const isCurrentUsername = await authUser.findOne({username: req.body.username})
      if (isCurrentUsername) {
        res.json(  {existUsername: "Username already exist"  }   ) 
          
   }
      const isCurrentEmail = await authUser.findOne({ email: req.body.email });

      if (isCurrentEmail) {
           res.json(  {existEmail: "Email already exist"  }   ) 
           return  
      }
              const newUser = await authUser.create(req.body);
              var token = jwt.sign({id: newUser._id}, "12345")
              await res.cookie("jwt", token, {httpOnly: true, maxAge: 86400000})
              res.json(   {id: newUser._id}     )      
      
              
    }catch(error){
      console.log(error)
    }
})

module.exports = router;