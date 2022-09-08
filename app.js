const express = require("express");
const dotenv = require('dotenv')
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

//Middlewares
app.use(express.urlencoded({extended:true})); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()); // parse requests of content-type - application/json
app.use(helmet()); // XSS vs. ataklar icin
app.use(cors()); //Cors 
app.use(bodyParser.urlencoded({extended:true})); //Encode edilmis url ler icin

//Config
dotenv.config({ path: './src/config/appConfig.env' })

//Routes
const indexRoute = require("./src/routes/index")
app.use("/api/"+process.env.API_VERSION, indexRoute)

//Server Process
app.listen(process.env.PORT, process.env.HOSTNAME, ()=>{
    console.log(` ${process.env.APP_TITLE}  http://${process.env.HOSTNAME}:${process.env.PORT}  Sunucu calisiyor. Api Versiyon: ${process.env.API_VERSION}`);
})
