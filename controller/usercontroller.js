const Customer = require("../models/customerSchema")
const moment = require('moment');
const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


///index controller

const user_index_get = (req,res)=>{
    Customer.find()
    .then((result)=>{
        res.render("index",{arr: result, moment: moment})
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
 
    Customer.create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
}

////delete controller

const user_delete = (req,res)=>{
    Customer.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err)
    })
    
}

///update controller

const user_edit_get = (req,res)=>{
    Customer.findById(req.params.id)
    .then((result)=>{
        res.render("user/edit", {country_list: country_list, obj : result, moment: moment})
    }).catch((err)=>{
       console.log(err)
    })
    
}

const user_put = (req,res)=>{
    Customer.findByIdAndUpdate(req.params.id , req.body)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err)
    })
    
}


/// search controller

const user_search_post = (req, res) => {
    data = req.body.search
    Customer.find({ $or: [{firstname: data },{lastname: data}]})
    .then((result)=>{
      res.render("user/search",{arr: result ,moment: moment })
  })
    .catch((err)=>{
      console.log(err)
    })
 
}

///view controller

const user_view_get = (req,res)=>{ 
    Customer.findById(req.params.id)
    .then((result)=>{
        res.render("./user/view",{customerviewed: result, moment: moment })
    }
    ).catch((err)=>{
        console.log(err)
    })
    

}

module.exports = {user_add_get, user_post, user_delete, user_edit_get, user_put, user_search_post, user_view_get, user_index_get}