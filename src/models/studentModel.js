const {
    sequelize,
    DataTypes
} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [2, 100],
                notNull: {
                    msg: 'Please enter your name zorunlu alan'
                }                
            }
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [2, 100]
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [2, 100]
            }            
        }
    });
    return Student;
};