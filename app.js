const express = require("express");
const dotenv = require('dotenv')
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');

const app = express();

//Swagger
swaggerDocument = require('./swagger.json');

//Middlewares
app.use(express.urlencoded({extended:true})); // parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json()); // parse requests of content-type - application/json
app.use(helmet({ contentSecurityPolicy: false })); // XSS vs. ataklar icin
app.use(cors({"allowedHeaders":"*", "Access-Control-Allow-Origin":"*"})); //Cors 
app.use(bodyParser.urlencoded({extended:true})); //Encode edilmis url ler icin
app.use( session( {secret: "NodeExpress", resave: false, saveUninitialized: true} ) ); //Session yonetimi icin Ornek: req.session.fullName = data.fulname
app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Config
dotenv.config({ path: './src/config/appConfig.env' })

//Routes
const indexRoute = require("./src/routes/index")
app.use("/api/"+process.env.API_VERSION, indexRoute)

//Server Process
//app.listen( (process.env.PORT || 3030), process.env.HOSTNAME, ()=>{
app.listen(()=>{
    //console.log(` ${process.env.APP_TITLE}  http://${process.env.HOSTNAME}:${process.env.PORT}  Sunucu calisiyor. Api Versiyon: ${process.env.API_VERSION}`);
    console.log("Sunucu calisiyor. Api Versiyon:");
})
