const express = require('express')
const app = express();
const mongoose = require('mongoose');
const port = rocess.env.port || 3000
app.use(express.urlencoded({extended : true}))
const Customer = require("./models/customerSchema")
app.set('view engine', 'ejs')
app.use(express.static('public'))
const methodOverride = require("method-override")
app.use(methodOverride('_method'))
const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


//auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
const moment = require('moment');
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});



// connect to MongoDB
mongoose.connect('mongodb+srv://younessbachar02:youyou2003@express.ugnrc.mongodb.net/all-data?retryWrites=true&w=majority')
.then(()=>{
    app.listen(port,()=>{
        console.log("server work")
    })
    console.log("connect")
})
.catch((err)=>{
    console.log(err)
})

// POST Requst



app.get('/',(req,res)=>{
    Customer.find()
    .then((result)=>{
        res.render("index",{arr: result, moment: moment})
    }
    ).catch((err)=>{
        console.log(err)
    })
    
})


app.get('/user/add.html',(req,res)=>{
    res.render("user/add",{country_list: country_list})
})

app.get('/edit/:id',(req,res)=>{
    Customer.findById(req.params.id)
    .then((result)=>{
        res.render("user/edit", {country_list: country_list,obj : result, moment: moment})
    }).catch((err)=>{
       console.log(err)
    })
    
})

app.get('/view/:id',(req,res)=>{ 
    Customer.findById(req.params.id)
    .then((result)=>{
        res.render("./user/view",{customerviewed: result, moment: moment })
    }
    ).catch((err)=>{
        console.log(err)
    })
    

})





//post request

app.post("/user/add.html", (req, res) => {
 
      Customer.create(req.body)
      .then(() => {
        res.redirect("/user/add.html");
      })
      .catch((err) => {
        console.log(err);
      });
  });


/////delete request
  app.delete('/delete/:id',(req,res)=>{
    Customer.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

////UPDATE REQUEST
app.put('/edit/:id',(req,res)=>{
    Customer.findByIdAndUpdate(req.params.id , req.body)
    .then((result)=>{
        res.redirect("/")
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

