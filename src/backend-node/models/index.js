const { Sequelize } = require('sequelize');
const UserModel = require('./user.model');
const ClientExpedienteModel = require('./clientExpediente.model');
const ClientModel = require('./client.model');
const ExpedienteModel = require('./expediente.model');
const DeudaModel = require('./deuda.model');
const PagoModel = require('./pago.model');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: 'false',
});

const models = {
    User: UserModel(sequelize),
    ClientExpediente: ClientExpedienteModel(sequelize),
    Client: ClientModel(sequelize),
    Expediente: ExpedienteModel(sequelize),
    Deuda: DeudaModel(sequelize),
    Pago: PagoModel(sequelize),
};
