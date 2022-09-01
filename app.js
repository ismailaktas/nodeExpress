const express = require("express");
const dotenv = require('dotenv')
const app = express();

//middlewares
app.use(express.urlencoded({extended:true})); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()); // parse requests of content-type - application/json

//Config
dotenv.config({ path: './src/config/appConfig.env' })


//Routes
const indexRoute = require("./src/routes/index")
app.use("/api/"+process.env.API_VERSION, indexRoute)


//DB Sync Check
/*
const db = require("./src/models");
db.sequelize.sync()
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
*/


//Server Process
app.listen(process.env.PORT, process.env.HOSTNAME, ()=>{
    console.log(` ${process.env.APP_TITLE}  http://${process.env.HOSTNAME}:${process.env.PORT}  Sunucu calisiyor. Api Versiyon: ${process.env.API_VERSION}`);
})
