const express = require('express')
const router = express.Router();

//router files
const home = require('./homeRoute')
const student = require('./studentRoute')
const user = require('./userRoute')

//api/home
router.use(home)

//api/student
router.use(student)

//api/user
router.use(user)

//export
module.exports = router;