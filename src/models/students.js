const {  sequelize, DataTypes} = require('sequelize');

const student = sequelize.define('students', {
    ID: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            min: {
                args: 2,
            },
            max: {
                args: 100,
            }
        }
    },
    surname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            min: {
                args: 2,
            },
            max: {
                args: 100,
            }
        }
    },
    email: {
        type: DataTypes.STRING(100),
        validate: {
            isEmail: true
        }
    }
});

module.exports = student;