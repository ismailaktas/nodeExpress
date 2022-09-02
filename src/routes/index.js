const express = require('express')
const router = express.Router();

//router files
const home = require('./homeRoute')
const student = require('./studentRoute')

//api/home
router.use(home)

//api/student
router.use(student)

//export
module.exports = router;