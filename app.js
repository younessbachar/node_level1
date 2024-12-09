const express = require('express')
const app = express();
const mongoose = require('mongoose');
const port = process.env.port || 3000
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
const methodOverride = require("method-override")
app.use(methodOverride('_method'))
app.use(express.json())
const {checkIfUser} = require('./middleware/middleware');

require('dotenv').config();

var cookieParser = require('cookie-parser');
app.use(cookieParser())

/// routers
const welcomerouter = require('./routes/welcomeRoute');
const addrouter = require('./routes/addCustomerRoute') 
const editrouter = require('./routes/editRoute')
const viewrouter = require('./routes/viewRoute')
const searchrouter = require('./routes/searchRoute')
const deleterouter = require('./routes/deleteRoute') 
const homerouter = require('./routes/homeRoute')
const loginrouter = require('./routes/loginRout')
const signuprouter = require('./routes/signupRoute')
const signoutrouter = require('./routes/signoutRoute')

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
mongoose.connect(
   process.env.MONGODB_URL
 )
.then(()=>{
    app.listen(port,()=>{
        console.log("server work")
    })
    console.log("connect")
})
.catch((err)=>{
    console.log(err)
})




app.use(checkIfUser)

///signup rout
app.use(signuprouter)

///login route
app.use(loginrouter)

///signout route
app.use(signoutrouter)

///welcome route
app.use(welcomerouter)

////home route
app.use(homerouter)

///add route
app.use(addrouter)

///view route
app.use(viewrouter)

///edit route
app.use(editrouter)

///delete route
app.use(deleterouter)

///search route
app.use(searchrouter)




