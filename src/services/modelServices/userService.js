const db = require("../../models");
const enums = require("../../common/enums")
const dbService = require("../commonServices/dbService");
const utils = require("../../common/utils");
const bcrypt = require("../commonServices/bcryptService");
const jwt = require("../commonServices/jwtService");
//
const Model = db.users;
const Op = db.Sequelize.Op;

//
exports.findAll = async (req, res, next) => {
    await Model.findAll().then(data => {
            res.status(200).send({
                success:true,
                message:process.env.MSG_SUCCESS,
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message: err.message
            });
        })
}

//
exports.findById = async (req, res, next) => {

    const id = req.params.id;

    await Model.findByPk(id)
        .then(data => {
            if (data) {
                res.send({
                    success:true,
                    message:process.env.MSG_SUCCESS,
                    data
                });
            } else {
                res.status(404).send({
                    success:false,
                    message: process.env.MSG_DATA_NOT_FOUND
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message:err.message
            });
        });
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
                    success:true,
                    message:process.env.MSG_SUCCESS
                });
            } else {
                res.status(400).send({
                    success:false,
                    message:process.env.MSG_FAIL
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message:err.message
            });
        });
}

//
exports.updateById = async (req, res, next) => {
    const dataId = req.body.id;
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
                    success:true,
                    message:process.env.MSG_SUCCESS
                });
            } else {
                res.status(400).send({
                    success:false,
                    message:process.env.MSG_FAIL
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message:err.message
            });
            
        });

        
};

//
exports.insertData = async (req, res) => {

    // Define a Record
    let hashedPassword = await bcrypt.hashStringAsync(req.body.password);
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
                success:true,
                message:process.env.MSG_SUCCESS,
                data
            });
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message: utils.replaceAll(err.message, "Validation error:", "")
            });
        });
};

//
exports.executeQuery = async (req, res, next) => {
    sqlQuery = "select id, concat(name, ' ', surname) namesurname from Model"
    sqlQuery = "call prcModel(0)"
    await dbService.executeSqlQuery(req, res, next, sqlQuery,  enums.queryType.storedProcedureOrFunction)
}

//Login

exports.login = async (req, res) => {

    const reqData = {
        where: {
            username: req.body.username
        }
    };

    await Model.findOne(reqData)
        .then(data => {
            if (data) {

                const userToken = jwt.jwtSign(data.id, data.username, data.password, process.env.SECRET_KEY);
                //data.push(userToken);

                res.send({
                    success:true,
                    message:process.env.MSG_SUCCESS,
                    data,
                    userToken
                });
            } else {
                res.status(404).send({
                    success:false,
                    message: process.env.MSG_DATA_NOT_FOUND
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                success:false,
                message:err.message
            });
        });

    
};
