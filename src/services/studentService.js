const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'test',
    'ismail',
    'ismail123', {
        host: '127.0.0.1',
        dialect: 'mysql'
    }
);


module.exports = {
    shorten: function() {
        return new Promise((resolve,reject)=>{
            sequelize.authenticate().then(() => {
                resolve("success");
            }).catch((error) => {
                reject("Failed");
            });            
        });
    },

    checkLink: function() {
        //some code
        ss = "CJKKK"
        return ss;
    }
}


exports.getDbConn = () => {
    let ss = ""
    sequelize.authenticate().then(() => {
        console.log("OKKK")
        ss = "OKK"
    }).catch((error) => {
        console.log("ERRR: " + error)
        ss = "ERRR"
    });
    return ss;
}