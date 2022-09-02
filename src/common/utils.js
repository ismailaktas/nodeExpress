const db = require("../models");

exports.getQueryType = (queryType) => {
    let objType = db.sequelize.QueryTypes.SELECT;
    switch(queryType){
        case 1:
            objType = db.sequelize.QueryTypes.SELECT;
            break;
        case 2:
            objType = db.sequelize.QueryTypes.EXEC;
            break;            
        case 3:
            objType = db.sequelize.QueryTypes.DELETE;
            break;    
        case 4:
            objType = db.sequelize.QueryTypes.INSERT;
            break;                  
        case 5:
            objType = db.sequelize.QueryTypes.UPDATE;
            break;    
        case 6:
            objType = db.sequelize.QueryTypes.RAW;
            break;                                          
        default:
            objType = db.sequelize.QueryTypes.SELECT;
            break;                                          
    }
    return objType;
}

//
exports.executeSqlQuery = async (req, res, next, sqlQuery, queryType) => {
    let qType = this.getQueryType(queryType);
    await db.sequelize.query(sqlQuery, {type: qType}).then(data=>{
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: process.env.MSG_DATA_NOT_FOUND
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: process.env.MSG_ERROR + ": " + err.message
        });
    });
}