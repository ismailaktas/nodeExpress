const db = require("../../models");
const redisClient = require("./redisService");

//Db Query Types
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

//Custom Exec Query
exports.executeSqlQuery = async (req, res, next, sqlQuery, queryType, redisKey="") => {
    let qType = this.getQueryType(queryType);
    let isCached = false;
    
    if (redisKey !== ""){ //redisKey bos degilse
        
        const cacheResults = await redisClient.get(redisKey);
        
        if (cacheResults) { //cache var ise
            isCached = true;
            data = JSON.parse(cacheResults);
    
            res.status(200).send({
                success: true,
                message: process.env.MSG_SUCCESS,
                isCached,
                data
            });
        }
        else { //Cache yok ise
            await db.sequelize.query(sqlQuery, {type: qType}).then(data=>{
                if (data) {

                    redisClient.set(redisKey, JSON.stringify(data));

                    res.status(200).send({
                        success: true,
                        message: process.env.MSG_SUCCESS,
                        isCached,
                        data
                    });
                } else {
                    res.status(404).send({
                        success: false,
                        message: process.env.MSG_DATA_NOT_FOUND
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    message: process.env.MSG_ERROR + ": " + err.message
                });
            });            
        }
    }
    else { 
        await db.sequelize.query(sqlQuery, {type: qType}).then(data=>{
            if (data) {
                res.status(200).send({
                    success: true,
                    message: process.env.MSG_SUCCESS,
                    isCached,
                    data
                });
            } else {
                res.status(404).send({
                    success: false,
                    message: process.env.MSG_DATA_NOT_FOUND
                });
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: process.env.MSG_ERROR + ": " + err.message
            });
        });
    }

}