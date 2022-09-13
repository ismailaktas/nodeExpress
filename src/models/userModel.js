const { sequelize, DataTypes } = require('sequelize');

const tableName = "users";
module.exports = (sequelize, Sequelize) => {
    const dataModel = sequelize.define(tableName, {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 100],
                    msg: 'username 2-100 karakter arasında olmalıdır'
                },
                notEmpty: true,
                notNull: {
                    msg: 'username zorunlu alan'
                }                
            }
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 100],
                    msg: 'fullname 2-100 karakter arasında olmalıdır'
                },
                notEmpty: true,
                notNull: {
                    msg: 'fullname zorunlu alan'
                }                
            }
        },        
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "password boş olamaz"
                },
                notNull: {
                    msg: 'password zorunlu alan'
                },
                len: {
                    args: [2, 100],
                    msg: 'password 2-100 karakter arasında olmalıdır'
                }                
            }
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "isActive boş olamaz"
                },
                notNull: {
                    msg: 'isActive zorunlu alan'
                }              
            }
        }        
    });
    return dataModel;
};

