import { User } from "../models/user.model.js";
import { Client } from "../models/client.model.js";
import { CaseFile } from "../models/caseFile.model.js";
import { ClientCaseFile } from "../models/clientCaseFile.model.js";
import { Debt } from "../models/debt.model.js";
import { Payment } from "../models/payment.model.js";
import { Sequelize } from "sequelize";

const formatName = (name) => {
  return name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

class Validation {
  static validateField(field, fieldName) {
    if (typeof field !== "string")
      throw new Error(`${fieldName} must be a string`);
  }
}

export const getUserClients = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const clients = await Client.findAll({
      where: { userId: id },
      include: [
        {
          model: CaseFile,
        },
        {
          model: Debt,
          attributes: [],
        },
        {
          model: Payment,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.fn('SUM', Sequelize.col('Debts.amount')),
            'totalDebts',
          ],
          [
            Sequelize.fn('SUM', Sequelize.col('Payments.amount')),
            'totalPayments',
          ],
        ]
      },
      group: [
        'Client.id',
        'CaseFiles.id', // Asegúrate de agrupar también por el modelo relacionado
        'CaseFiles->ClientCaseFile.ClientId', // Columnas del modelo de unión
        'CaseFiles->ClientCaseFile.CaseFileId',
      ]
    });
    if (!clients.length) {
      return res.status(404).json({ message: "Clients not found" });
    }

    
    res.json(clients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
  try {
    const { clientEmail, clientFirstName, clientLastName, clientPhoneNumber, clientDescription } = req.body;

    const userId = req.user.id;
  
    Validation.validateField(clientEmail, 'Email');
    Validation.validateField(clientFirstName, 'First name');
    Validation.validateField(clientLastName, 'Last name');
    Validation.validateField(clientPhoneNumber, 'Phone number');
    Validation.validateField(clientDescription, 'Description');
  
    await Client.create({
      email: clientEmail.trim().toLowerCase(),
      firstName: formatName(clientFirstName),
      lastName: formatName(clientLastName),
      phoneNumber: clientPhoneNumber.trim(),
      description: clientDescription.trim(),
      userId: userId,
    });

    const clients = await Client.findAll({
      where: {userId: userId},
      include: [CaseFile],
    });

    return res.status(201).json({ clients: clients });

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByPk(id, {
      include: [CaseFile]
    });
    if(!client) {
      return res.status(404).json({ message: "Client not found." })
    }

    res.json({ client })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
