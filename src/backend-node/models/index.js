const { Sequelize } = require('sequelize');
const UserModel = require('./user.model');
const ClientCaseFileModel = require('./clientCaseFile.model');
const ClientModel = require('./client.model');
const CaseFileModel = require('./caseFile.model');
const DebtModel = require('./debt.model');
const PaymentModel = require('./payment.model');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: 'false',
});

const models = {
    User: UserModel(sequelize),
    ClientCaseFile: ClientCaseFileModel(sequelize),
    Client: ClientModel(sequelize),
    CaseFile: CaseFileModel(sequelize),
    Debt: DebtModel(sequelize),
    Payment: PaymentModel(sequelize),
};

models.User.hasMany(models.Client);
models.Client.belongsTo(models.User);

models.User.hasMany(models.CaseFile);
models.CaseFile.belongsTo(models.User);

models.User.hasMany(models.Debt);
models.Debt.belongsTo(models.User);

models.User.hasMany(models.Payment);
models.Payment.belongsTo(models.User);

models.Client.hasMany(models.Debt);
models.Debt.belongsTo(models.Client);

models.Client.hasMany(models.Payment);
models.Payment.belongsTo(models.Client);

models.CaseFile.hasMany(models.Debt);
models.Debt.belongsTo(models.CaseFile);

models.CaseFile.hasMany(models.Payment);
models.Payment.belongsTo(models.CaseFile);

models.Client.belongsToMany(models.CaseFile, {through: 'ClientCaseFileModel'});
models.CaseFile.belongsToMany(models.Client, {through: 'ClientCaseFileModel'});

module.exports = { sequelize, models };
