const db = require("../../models");
const enums = require("../../common/enums")
const dbService = require("../commonServices/dbService");
const utils = require("../../common/utils");
const bcryptService = require("../commonServices/bcryptService");
const jwtService = require("../commonServices/jwtService");
const redisService = require("../commonServices/redisService");

//
const Model = db.users;
const redisKeyGroup = "users:";
const Op = db.Sequelize.Op;

//Token alan kullanıcı bilgileri
//req.userData (id, username, password, iat, exp)

//
exports.findAll = async (req, res, next) => {

    //console.log("Req:", req.userData.id); Token almış kullanıcı

    const redisKey = "users_0";
    let isCached = false;
    const cacheResults = await redisService.getKey(redisKey);

    if (cacheResults) {
        isCached = true;
        data = JSON.parse(cacheResults);

        res.status(200).send({
            success: true,
            message: process.env.MSG_SUCCESS,
            isCached,
            data
        });

    } else {
        await Model.findAll().then(data => {

            redisService.setKey(redisKey, JSON.stringify(data), 5);

            res.status(200).send({
                    success: true,
                    message: process.env.MSG_SUCCESS,
                    isCached,
                    data
                });
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            });
    }

}

//
exports.findById = async (req, res, next) => {

    const id = req.params.id;
    const redisKey =  redisKeyGroup+"users_" + id;
    let isCached = false;

    const cacheResults = await redisService.getKey(redisKey);

    if (cacheResults) {
        isCached = true;
        data = JSON.parse(cacheResults);

        res.status(200).send({
            success: true,
            message: process.env.MSG_SUCCESS,
            isCached,
            data
        });

    } else {

        await Model.findByPk(id)
            .then(data => {
                if (data) {
                    // req.session.fullName = data.fulname <- Ornek session kullanimi

                    redisService.setKey(redisKey, JSON.stringify(data), 55);

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
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: err.message
                });
            });

    }

}

//
exports.deleteById = async (req, res, next) => {

    const id = req.params.id;

    await Model.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    success: true,
                    message: process.env.MSG_SUCCESS
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: process.env.MSG_FAIL
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message
            });
        });
}

//
exports.updateById = async (req, res, next) => {
    const dataId = req.params.id;
    const reqData = {
        username: req.body.username,
        fullname: req.body.fullname,
        isActive: req.body.isActive
    };

    await Model.update(reqData, {
            where: {
                id: dataId
            }
        })
        .then(num => {

            if (num == 1) {
                res.status(200).send({
                    success: true,
                    message: process.env.MSG_SUCCESS
                });
            } else {
                res.status(400).send({
                    success: false,
                    message: process.env.MSG_FAIL
                });
            }

        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message
            });

        });


};

//
exports.insertData = async (req, res) => {

    // Define a Record
    let hashedPassword = await bcryptService.hashStringAsync(req.body.password);
    const reqData = {
        username: req.body.username,
        password: hashedPassword,
        fullname: req.body.fullname,
        isActive: req.body.isActive
    };

    // Create Record on Database
    await Model.create(reqData)
        .then(data => {
            res.status(200).send({
                success: true,
                message: process.env.MSG_SUCCESS,
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: utils.replaceAll(err.message, "Validation error:", "")
            });
        });
};

//
exports.executeQuery = async (req, res, next) => {
    sqlQuery = "call prcStudents(0)";
    await dbService.executeSqlQuery(req, res, next, sqlQuery, enums.queryType.storedProcedureOrFunction, "userCustom")
}

//Login
exports.login = async (req, res) => {

    const reqData = {
        where: {
            username: req.body.username,
            isActive: 1
        }
    };

    await Model.findOne(reqData)
        .then(data => {
            if (data) {

                //Verify password
                const verifyPassword = bcryptService.compareStringSync(req.body.password, data.password);

                if (verifyPassword) {
                    const userToken = jwtService.jwtSign(data.id, data.username, data.fullname, process.env.SECRET_KEY);
                    res.send({
                        success: true,
                        message: process.env.MSG_SUCCESS,
                        data,
                        userToken
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        message: process.env.MSG_NO_AUTH
                    });
                }

            } else {
                res.status(401).send({
                    success: false,
                    message: process.env.MSG_NO_AUTH
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message
            });
        });


};