const db = require("../models");
const Students = db.students;
const Op = db.Sequelize.Op;

//
exports.findAll = async (req, res, next) => {
    await Students.findAll().then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
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
                res.send(data);
            } else {
                res.status(404).send({
                    message: process.env.MSG_DATA_NOT_FOUND
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: process.env.MSG_ERROR + ": " + err.message
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
                    message: process.env.MSG_SUCCESS
                });
            } else {
                res.status(400).send({
                    message: process.env.MSG_FAIL
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: process.env.MSG_ERROR + ": " + err.message
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
                    message: process.env.MSG_SUCCESS
                });
            } else {
                res.status(400).send({
                    message: process.env.MSG_FAIL
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: process.env.MSG_ERROR + ": " + err.message
            });
        });
};

//
exports.insertData = (req, res) => {

    // Validation
    if (!req.body.name) {
        res.status(400).send({
            message: process.env.MSG_VALIDATE + " - name"
        });
        return;
    }
    if (!req.body.surname) {
        res.status(400).send({
            message: process.env.MSG_VALIDATE + " - surname"
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({
            message: process.env.MSG_VALIDATE + " - email"
        });
        return;
    }

    // Define a Record
    const student = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    };

    // Create Record on Database
    Student.create(student)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: process.env.MSG_ERROR + ": " + err.message
            });
        });
};

//
exports.executeSqlQuery = async (req, res, next, sqlQuery) => {
    await db.sequelize.query(sqlQuery).then(data=>{
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

