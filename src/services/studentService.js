const db = require("../models");
const enums = require("../common/enums")
const dbService = require("./dbService");
const utils = require("../common/utils");
const bcrypt = require("../common/bcrypt");

//
const Students = db.students;
const Op = db.Sequelize.Op;

//
exports.findAll = async (req, res, next) => {
    await Students.findAll().then(data => {
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

    await Students.findByPk(id)
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

    await Students.destroy({
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

    const studentData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    };   

    await Students.update(studentData, {
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
    const studentData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword
    };

    // Create Record on Database
    await Students.create(studentData)
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
    sqlQuery = "select id, concat(name, ' ', surname) namesurname from students"
    sqlQuery = "call prcStudents(0)"
    await dbService.executeSqlQuery(req, res, next, sqlQuery,  enums.queryType.storedProcedureOrFunction)
}

