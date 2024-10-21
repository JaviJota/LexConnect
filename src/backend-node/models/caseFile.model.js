const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CaseFile = sequelize.define('CaseFile', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numExp: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        nig: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(250),
            allowNull: true,
            unique: false,
        },
        court: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: false,
        },
        status: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: false,
        },
        creationDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            unique: false,
        },
    });
    return CaseFile;
};