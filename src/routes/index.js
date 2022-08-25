const express = require('express')
const router = express.Router();

//router files
const home = require('./home')
const student = require('./student')

//api/home
router.use(home)

//api/student
router.use(student)

//export
module.exports = router;