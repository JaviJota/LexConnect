import { Client } from "../models/client.model.js";
import { Debt } from "../models/debt.model.js";
import { CaseFile } from "../models/caseFile.model.js";

class Validation {
    static validateStringField(field, fieldName) {
      if (typeof field !== "string")
        throw new Error(`${fieldName} must be a string`);
    }
    static validateNumberField(field, fieldName) {
      if (typeof field !== "number")
        throw new Error(`${fieldName} must be a number`);
    }
}

export const createDebt = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id
        const { amount, concept, caseFileId } = req.body

        Validation.validateStringField(concept, 'Concept');
        Validation.validateStringField(amount, 'Amount');
        Validation.validateNumberField(caseFileId, 'CaseFileId');

        const client = await Client.findByPk(id);
        if(!client) {
            return res.status(404).json({ message: "Client not found." })
        }

        await Debt.create({
            title: concept.trim(),
            amount: amount,
            caseFileId: caseFileId,
            clientId: id,
            userId: userId,
        });

        const debts = await Debt.findAll({
            where: { clientId: id },
            include: [
                {
                    model: CaseFile,
                    attributes: ['numExp'],
                },
            ],
        });

        res.status(201).json(debts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getDebts = async (req, res) => {
    try {
        const { id } = req.params;

        const debts = await Debt.findAll({
            where: { clientId: id },
            include: [
                {
                    model: CaseFile,
                    attributes: ['numExp'],
                },
            ]
        });

        if(!debts) {
            return res.status(404).json({ message: "Debts not found." })
        }

        res.json(debts) 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};