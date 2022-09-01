const Sequelize = require("sequelize");
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, config);

const models = [
    // Add here all of your models
    require('../models/students'),
   ].map(m=>m(sequelize));
   sequelize.sync().then(console.log('DB is synced'));
   
   module.exports = sequelize;