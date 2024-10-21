const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ClientCaseFile = sequelize.define('ClientCaseFile', {
        clientId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Clients',
                key: 'id'
            },
        },
        CaseFileId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'CaseFile',
                key: 'id'
            },
        },
    });
    return ClientCaseFile;
};