import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Client } from "./client.model.js";
import { CaseFile } from "./caseFile.model.js";
import { Debt } from "./debt.model.js";
import { Payment } from "./payment.model.js";

export const User = sequelize.define("User", {
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
    defaultValue: DataTypes.NOW,
  },
}, {
    defaultScope: {
      attributes: { exclude: ['password'] },  // Excluye la contraseña por defecto
    },
});

// -------------------------------
User.hasMany(Client, {
    foreignKey: 'userId',
    sourceKey: 'id',
});

Client.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id',
});

// // -------------------------------
// pussyUser.hasMany(CaseFile, {
//     foreignKey: 'userId',
//     sourceKey: 'id',
// });
// CaseFile.belongsTo(User, {
//     foreignKey: 'userId',
//     targetId: 'id',
// });

// // -------------------------------
// User.hasMany(Debt, {
//     foreignKey: 'userId',
//     sourceKey: 'id',
// });
// Debt.belongsTo(User, {
//     foreignKey: 'userId',
//     targetId: 'id',
// });

// // -------------------------------
// User.hasMany(Payment, {
//     foreignKey: 'userId',
//     sourceKey: 'id',
// });
// Payment.belongsTo(User, {
//     foreignKey: 'userId',
//     targetId: 'id',
// }); :DD

