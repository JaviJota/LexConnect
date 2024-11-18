import { CaseFile } from "../models/caseFile.model.js";
import { Debt } from "../models/debt.model.js";
import { Payment } from "../models/payment.model.js";

export const debtToPayment = async (req, res) => {
    try {
        const { id } = req.params;

        const debt = await Debt.findByPk(id);
        if(!debt) {
            return res.status(404).json({ message: "Debt not found." })
        }

        await Payment.create({
            title: debt.title,
            amount: debt.amount,
            caseFileId: debt.caseFileId,
            clientId: debt.clientId,
            userId: debt.userId
        })

        await Debt.destroy({ where: { id } });

        const debts = await Debt.findAll({
            where: { clientId: debt.clientId },
            include: [
                {
                    model: CaseFile,
                    attributes: ['numExp'],
                },
            ],
        });

        const payments = await Payment.findAll({
            where: { clientId: debt.clientId },
            include: [
                {
                    model: CaseFile,
                    attributes: ['numExp'],
                },
            ],
        });
        res.json({
            debts: debts,
            payments: payments,
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
