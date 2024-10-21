const { Description } = require('@headlessui/react');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Client = sequelize.define('Client', {
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
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: true,
            unique: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            unique: false
        },
    });
    return Client;
};