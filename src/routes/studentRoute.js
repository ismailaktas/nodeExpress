const express = require('express')
const router = express.Router();
const tokenValidate = require("../middlewares/jwtMiddleware");
const controller = require('../controllers/'+process.env.API_VERSION+'/studentController')

router.route("/students").get(tokenValidate, controller.findAll);
router.route("/students/:id").get(tokenValidate, controller.findById);
router.route("/students/:id").delete(tokenValidate, controller.deleteById);
router.route("/students/:id").put(tokenValidate, controller.updateById);
router.route("/student").post(tokenValidate, controller.insertData); 
router.route("/studentcustom").get(tokenValidate, controller.findBySqlQuery);

module.exports = router