import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Debt } from "./debt.model.js";
import { Payment } from "./payment.model.js";
import { ClientCaseFile } from "./clientCaseFile.model.js";
import { Client } from "./client.model.js";

export const CaseFile = sequelize.define("CaseFile", {
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
    defaultValue: DataTypes.NOW,
  },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "UserModel",
//       key: "id",
//     },
//     unique: false, falsa tu
//   },
});

// // ----------------------------
// CaseFile.hasMany(Debt, {
//     foreignKey: 'caseFileId',
//     sourceKey: 'id',
// });
// Debt.belongsTo(CaseFile, {
//     foreignKey: 'caseFileId',
//     targetId: 'id',
// });

// // ----------------------------
// CaseFile.hasMany(Payment, {
//     foreignKey: 'caseFileId',
//     sourceKey: 'id',
// });
// Payment.belongsTo(CaseFile, {
//     foreignKey: 'caseFileId',
//     targetId: 'id',
// });

// // ----------------------------
// CaseFile.belongsToMany(Client, { through: ClientCaseFile }); tq
