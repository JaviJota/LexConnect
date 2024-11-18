import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const ClientCaseFile = sequelize.define('ClientCaseFile', {
    ClientId: {
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
            model: 'CaseFiles',
            key: 'id'
        },
    },
});

