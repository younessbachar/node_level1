const express = require('express')
const app = express();
const mongoose = require('mongoose');
const port = process.env.port || 3000
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
const methodOverride = require("method-override")
app.use(methodOverride('_method'))

///authUser model
const authUser =  require('./models/authUser');

/// routers
const welcomerouter = require('./routes/welcomeRoute');
const addrouter = require('./routes/addCustomerRoute') 
const editrouter = require('./routes/editRoute')
const viewrouter = require('./routes/viewRoute')
const searchrouter = require('./routes/searchRoute')
const deleterouter = require('./routes/deleteRoute') 
const homerouter = require('./routes/homeroute')
const loginrouter = require('./routes/loginRout')
const signuprouter = require('./routes/signupRoute')

//auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// connect to MongoDB
mongoose.connect('mongodb+srv://younessbachar02:youyou2003@express.ugnrc.mongodb.net/all-data?retryWrites=true&w=majority&appName=express')
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

app.use(deleterouter)

///Create User
app.post("/signup", async (req, res) => {
  try{
    authUser.create(req.body)
    .then((result)=>{
      console.log(result)
      res.redirect("signup")
    }
    )
  }
 catch(error){
  console.log(error)
 }
});