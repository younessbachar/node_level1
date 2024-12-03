const jwt = require("jsonwebtoken")
const authUser = require("../models/authUser")


const checkIfUser = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
     jwt.verify(token,"12345", async(err, decoded)=>{
         if(err){
            res.locals.user = null
            next()
         }else{
             const logiuser = await authUser.findById(decoded.id)
             res.locals.user = logiuser
             next()
         }
     })
 }else{
     res.locals.user = null
     next();
 }
 }

 module.exports = checkIfUser