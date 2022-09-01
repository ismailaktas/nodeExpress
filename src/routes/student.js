const express = require('express')
const router = express.Router();
const studentController = require('../controllers/'+process.env.API_VERSION+'/studentController')

router.route("/students").get(studentController.studentsAll);
router.route("/students/:id").get(studentController.student);

module.exports = router