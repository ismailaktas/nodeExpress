const express = require('express')
const router = express.Router();
const controller = require('../controllers/'+process.env.API_VERSION+'/studentController')

router.route("/students").get(controller.findAll);
router.route("/students/:id").get(controller.findById);
router.route("/students/:id").delete(controller.deleteById);
router.route("/students/:id").put(controller.updateById);
router.route("/student").post(controller.insertData); 
router.route("/studentcustom").get(controller.findBySqlQuery);

module.exports = router