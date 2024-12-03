const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get("/signout",async(req,res)=>{
    res.cookie("jwt", "", {httpOnly: true, maxAge: 1})
    res.redirect("/")
})

module.exports = router