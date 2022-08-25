const express = require("express");
const dotenv = require('dotenv')
const app = express();

//Config
dotenv.config({ path: './src/config/appConfig.env' })

//Routes
const indexRoute = require("./src/routes/index")
app.use("/api/"+process.env.API_VERSION, indexRoute)




//Server Process
app.listen(process.env.PORT, process.env.HOSTNAME, ()=>{
    console.log(` ${process.env.APP_TITLE}  http://${process.env.HOSTNAME}:${process.env.PORT}  Sunucu calisiyor`);
})
