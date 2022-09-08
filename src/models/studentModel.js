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
                len: {
                    args: [2, 100],
                    msg: 'Name 2-100 karakter arasında olmalıdır'
                },
                notEmpty: true,
                notNull: {
                    msg: 'Name zorunlu alan'
                }                
            }
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "surname boş olamaz"
                },
                notNull: {
                    msg: 'surname zorunlu alan'
                },
                len: {
                    args: [2, 100],
                    msg: 'surname 2-100 karakter arasında olmalıdır'
                }                
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: { msg: 'geçersiz email.' },
                len: {
                    args: [2, 100],
                    msg: 'email 2-100 karakter arasında olmalıdır'
                },
                notEmpty: true,
                notNull: {
                    msg: 'email zorunlu alan'
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
                    args: [2, 255],
                    msg: 'password 2-100 karakter arasında olmalıdır'
                }                
            }
        }        
    });
    return Student;
};