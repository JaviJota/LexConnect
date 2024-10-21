const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        creationDate: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
            unique: false,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Client',
                key: 'id',
            },
            unique: false,
        },
        caseFileId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CaseFile',
                key: 'id',
            },
            unique: false,
        },
    });
    return Payment;
};