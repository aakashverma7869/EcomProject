// to connect node with data base which is take from  https://mongoosejs.com/
//run command in cmd
//"C:\Program Files\MongoDB\Server\4.2\bin\mongo.exe"
//then show dbs //quit()
require('dotenv').config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();
// these three are used as a middlleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// MY routes  
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//db connection
mongoose.connect(process.env.DATABASE,
 {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
 .then(()=>{
     console.log("DB CONNECTED................");
 });
// .catch(()=>
// {
// console.log("OOPS!.......DB is unable to connect");
// })

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
// it means to use this we have to mention /api as prefix
app.use("/api", authRoutes);
app.use("/api",userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
//app.use("/api", categoryRoutes);


// Port
const port = process.env.PORT || 8000;
//starting Server
 app.listen(port, () =>{
     //console.log("App is running........")
     console.log(`app is running at ${port}`);
 })
 // to run node app.js but due to installation of nodemon we use npm start