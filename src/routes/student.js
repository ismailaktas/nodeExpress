const express = require('express')
const router = express.Router();
const studentController = require('../controllers/studentController')

router.route("/students").get(studentController.students);
router.route("/students/:id").get(studentController.student);

module.exports = router