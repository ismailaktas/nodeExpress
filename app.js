const express = require("express");
const app = express();

//Config
const appConfigs = require("./src/configs/appConfig");

//Controllers
const homeController = require("./src/controllers/homeController")
const studentController = require("./src/controllers/studentController")

//Routes
app.get("/", homeController.home)
app.get("/students", studentController.students);
app.get("/students/:id", studentController.student);




app.listen(appConfigs.port, appConfigs.host, ()=>{
    console.log(` ${appConfigs.host}:${appConfigs.port} -- Sunucu calisiyor`);
})
