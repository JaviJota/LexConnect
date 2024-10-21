const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: false,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: false,
        },
        creationDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
    });
    return User;
};