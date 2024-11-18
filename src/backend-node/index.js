// import { Sequelize } from 'sequelize';
import { app } from './server.js';
import { sequelize } from './database/database.js';

import { User } from './models/user.model.js';
import { ClientCaseFile } from './models/clientCaseFile.model.js';
import { Client } from './models/client.model.js';
import { CaseFile } from './models/caseFile.model.js';
import { Debt } from './models/debt.model.js';
import { Payment } from './models/payment.model.js';

// import './models/user.model.js'
// import './models/client.model.js'
// import './models/clientCaseFile.model.js'
// import './models/debt.model.js'
// import './models/payment.model.js'
// import './models/caseFile.model.js'

// ----------- User relationships -----------
User.hasMany(CaseFile, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
CaseFile.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id',
});

User.hasMany(Debt, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
Debt.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id',
});

User.hasMany(Payment, {
    foreignKey: 'userId',
    sourceKey: 'id',
});
Payment.belongsTo(User, {
    foreignKey: 'userId',
    targetId: 'id',
});

// ----------- Client relationships -----------
Client.hasMany(Debt, {
    foreignKey: 'clientId',
    sourceKey: 'id',
});
Debt.belongsTo(Client, {
    foreignKey: 'clientId',
    targetId: 'id',
});

Client.hasMany(Payment, {
    foreignKey: 'clientId',
    sourceKey: 'id',
});
Payment.belongsTo(Client, {
    foreignKey: 'clientId',
    targetId: 'id',
});

Client.belongsToMany(CaseFile, { through: ClientCaseFile });

// ----------- CaseFile relationships -----------
CaseFile.hasMany(Debt, {
    foreignKey: 'caseFileId',
    sourceKey: 'id',
});
Debt.belongsTo(CaseFile, {
    foreignKey: 'caseFileId',
    targetId: 'id',
});

CaseFile.hasMany(Payment, {
    foreignKey: 'caseFileId',
    sourceKey: 'id',
});
Payment.belongsTo(CaseFile, {
    foreignKey: 'caseFileId',
    targetId: 'id',
});

CaseFile.belongsToMany(Client, { through: ClientCaseFile });



const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await sequelize.sync({force: false});
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.log('Error al conectar con la base de datos:', error)
    }
};

main();

