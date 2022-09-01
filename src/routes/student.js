const express = require('express')
const router = express.Router();
const studentController = require('../controllers/'+process.env.API_VERSION+'/studentController')

router.route("/students").get(studentController.findAll);
router.route("/students/:id").get(studentController.findById);
router.route("/students/:id").delete(studentController.deleteById);
router.route("/students/:id").put(studentController.updateById);
router.route("/student").post(studentController.insertData); 
router.route("/studentcustom").get(studentController.findBySqlQuery);

module.exports = router