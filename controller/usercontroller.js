const moment = require('moment');
const authUser = require('../models/authUser');
const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const { validationResult } = require('express-validator');


const multer = require('multer');
const upload = multer({dest: "uploads/"});

const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'dy8vqifft', 
    api_key: '943637351827538', 
    api_secret: 'xdY2gKlo-NhYmZi9pmXVIRzwiOQ' // Click 'View API Keys' above to copy your API secret
});

///signup controller

const signup_get_controller = (req,res)=>{
    res.render("Auth/signup")
}

const signup_post_controller = async (req,res)=>{
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
              var token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY)
              await res.cookie("jwt", token, {httpOnly: true, maxAge: 86400000})
              res.json(   {id: newUser._id}     )      
      
              
    }catch(error){
      console.log(error)
    }
}


////login controller

const login_get_controller = (req,res)=>{
    res.render("Auth/login")
}

const login_post_controller = async (req,res)=>{
    
    const loginUser = await authUser.findOne({$or: [{ email: req.body.email},{username: req.body.email}]})
    if(!loginUser){
        res.json({invalidemail: "wrong email"})
    
    }else{
        const match = await bcrypt.compare(req.body.password, loginUser.password)
        if(match){
            var token = jwt.sign({id: loginUser._id}, process.env.JWT_SECRET_KEY)
            res.cookie("jwt", token, {httpOnly: true, maxAge: 86400000})
           res.json({id: loginUser._id})
        }else{
            res.json({invalidpassword: "wrong password"})
        }
}
}

///signout controller
const signout_controller = (req,res)=>{
    res.cookie("jwt", "", {httpOnly: true, maxAge: 1})
    res.redirect("/")
}

///index controller

const user_index_get = (req,res)=>{
   var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY)
    authUser.findById(decoded.id)
     .then((result)=>{
        res.render("index",{arr: result.customerInfo, moment: moment})
    }
    ).catch((err)=>{
        console.log(err)
    })
    
}

///add controller

const user_add_get = (req,res)=>{
    res.render("user/add",{country_list: country_list})
}

const user_post = (req, res) => {
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY)
    console.log(req.body);
    authUser.updateOne({_id: decoded.id},{ $push: { customerInfo: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        country: req.body.country,
        gender: req.body.gender,
        createdAt: new Date()
    } 
 }}
    )
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
}

///update controller

const user_edit_get = (req,res)=>{
    authUser.findOne({"customerInfo._id": req.params.id})  
   .then((result)=>{
         const clickedcustomer = result.customerInfo.find((item) => { 
         return item._id == req.params.id})
    res.render("user/edit", {country_list: country_list, obj : clickedcustomer, moment: moment})
}).catch((err)=>{
   console.log(err)
})

}

const user_put = (req,res)=>{
authUser.updateOne({"customerInfo._id": req.params.id}, { 
    "customerInfo.$.firstname" : req.body.firstname,
    "customerInfo.$.lastname" : req.body.lastname,
    "customerInfo.$.email" : req.body.email,
    "customerInfo.$.phoneNumber" : req.body.phoneNumber,
    "customerInfo.$.age" : req.body.age,
    "customerInfo.$.country" : req.body.country,
    "customerInfo.$.gender" : req.body.gender,
    "customerInfo.$.updatedAt" : new Date(),
    
 })
.then(()=>{
    res.redirect("/home")
})
.catch((err)=>{
    console.log(err)
})

}


////delete controller

const user_delete = (req,res)=>{
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY)
    authUser.updateOne({_id: decoded.id},
         { $pull: { customerInfo : {_id: req.params.id}}}
        )
    .then(()=>{
        res.redirect("/home")
    })
    .catch((err)=>{
        console.log(err)
    })
    
}


/// search controller

const user_search_post =  (req, res) => {
    var searchText = req.body.searchText.trim()
    var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY)
     authUser.findOne({_id: decoded.id})     
    .then((result)=>{
        const searchCustomer = result.customerInfo.filter((item)=>{
           return (
            item.firstname.includes(searchText) ||
            item.lastname.includes(searchText)
           )
        })
        console.log(searchCustomer);
        res.render("user/search",{arr: searchCustomer ,moment: moment })
  })
    .catch((err)=>{
      console.log(err)
    })
 
}

///view controller

const user_view_get = (req,res)=>{ 
    authUser.findOne({"customerInfo._id": req.params.id})
    .then((result)=>{
           const clickedcustomer = result.customerInfo.find((item) => { 
            return item._id == req.params.id
         })
        res.render("./user/view",{customerviewed: clickedcustomer , moment: moment })
    }
    ).catch((err)=>{
        console.log(err)
    })
    
}

///profile image controller

const user_profileImage_post = async(req, res, next)=>{
    console.log(req.file);
    cloudinary.uploader.upload(req.file.path, async (error, result)=>{
       if(result){
        var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
        const avatar = await authUser.updateOne({_id: decoded.id}, {profileImage: result.secure_url})
        console.log(avatar)
        res.redirect("/home")

    }
    })}


module.exports = {user_add_get, user_post, user_delete, user_edit_get, user_put, user_search_post, user_view_get, user_index_get, signup_get_controller, signout_controller, signup_post_controller, login_get_controller, login_post_controller, user_profileImage_post}