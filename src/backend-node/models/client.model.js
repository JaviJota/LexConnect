import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Debt } from "./debt.model.js";
import { Payment } from "./payment.model.js";
import { ClientCaseFile } from "./clientCaseFile.model.js";
import { CaseFile } from "./caseFile.model.js";

export const Client = sequelize.define("Client", {
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
    unique: false,
  },
  description: {
    type: DataTypes.STRING(450),
    allowNull: true,
    unique: false,
  }
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: "UserModels",
//       key: "id",
//     },
//     unique: false,
//   },
});

// ---------------------------------
// Client.hasMany(Debt, {
//     foreignKey: 'clientId',
//     sourceKey: 'id',
// });
// Debt.belongsTo(Client, {
//     foreignKey: 'clientId',
//     targetId: 'id',
// });

// // ---------------------------------
// Client.hasMany(Payment, {
//     foreignKey: 'clientId',
//     sourceKey: 'id',
// });
// Payment.belongsTo(Client, {
//     foreignKey: 'clientId',
//     targetId: 'id',
// });

// // ---------------------------------
// Client.belongsToMany(CaseFile, { through: ClientCaseFile });
