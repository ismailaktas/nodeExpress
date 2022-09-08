const express = require('express')
const router = express.Router();
const tokenValidate = require("../middlewares/jwtMiddleware");
const controller = require('../controllers/'+process.env.API_VERSION+'/userController')

router.route("/users").get(tokenValidate, controller.findAll);
router.route("/users/:id").get(tokenValidate, controller.findById);
router.route("/users/:id").delete(tokenValidate, controller.deleteById);
router.route("/users/:id").put(tokenValidate, controller.updateById);
router.route("/user").post(tokenValidate, controller.insertData); 
router.route("/usercustom").get(tokenValidate, controller.findBySqlQuery);

//Login
router.route("/login").post(controller.login); 

module.exports = router