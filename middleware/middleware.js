const jwt = require('jsonwebtoken');
const authUser = require("../models/authUser")


const checkIfUser = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
     jwt.verify(token,"12345", async(err, decoded)=>{
         if(err){
            res.locals.user = null
            next()
         }else{
             const loginuser = await authUser.findById(decoded.id)
             res.locals.user = loginuser
             next()
         }
     })
 }else{
     res.locals.user = null
     next();
 }
 }

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token,"12345",(err)=>{
            if(err){
                res.redirect("/login")
            }else{
                next()
            }
        })
    }else{
        res.redirect("/login")
    }

}



module.exports = {requireAuth , checkIfUser}