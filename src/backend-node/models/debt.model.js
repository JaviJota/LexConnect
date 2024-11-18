import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const Debt = sequelize.define('Debt', {
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
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'UserModel',
        //         key: 'id',
        //     },
        //     unique: false,
        // },
        // clientId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'ClientModel',
        //         key: 'id',
        //     },
        //     unique: false,
        // },
        // caseFileId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'CaseFileModel',
        //         key: 'id',
        //     },
        //     unique: false,
        // },
    });
