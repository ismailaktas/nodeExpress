const express = require('express')
const router = express.Router();
const homeController = require('../controllers/'+process.env.API_VERSION+'/homeController')

router.route('/').get(homeController.home);

module.exports = router