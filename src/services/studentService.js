const db = require("../models");
const enums = require("../common/enums")
const utils = require("../common/utils");
const { sequelize } = require("../models");
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

    Students.destroy({
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
exports.updateById = (req, res) => {
    const id = req.params.id;
    Student.update(req.body, {
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
};

//
exports.insertData = (req, res) => {

    // Define a Record
    const studentData = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    };

    // Create Record on Database
    Students.create(studentData)
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
    //sqlQuery = "select id, concat(name, ' ', surname) namesurname from students"
    sqlQuery = "call prcStudents(0)"
    utils.executeSqlQuery(req, res, next, sqlQuery,  enums.queryType.storedProcedureOrFunction)
}

