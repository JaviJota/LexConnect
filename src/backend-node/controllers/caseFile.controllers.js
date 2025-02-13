import { CaseFile } from "../models/caseFile.model.js";
import { ClientCaseFile } from "../models/clientCaseFile.model.js";
import { Client } from "../models/client.model.js";

class Validation {
  static validateField(field, fieldName) {
    if (typeof field !== "string")
      throw new Error(`${fieldName} must be a string`);
  }
}

export const getUserCaseFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const userCaseFiles = await CaseFile.findAll({
      where: { userId: userId },
      include: [
        {
          model: Client,
          through: { attributes: [] }, // Excluir datos innecesarios de la tabla intermedia
        },
      ],
    });
    if (!userCaseFiles.length) {
      return res.status(404).json({ message: "Casefiles not found" });
    }

    res.json(userCaseFiles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCaseFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { numExp, nig, description, court, status, clientId } = req.body;

    Validation.validateField(numExp, "Nº Expediente");
    Validation.validateField(nig, "NIG");
    Validation.validateField(description, "Description");
    Validation.validateField(court, "Court");
    Validation.validateField(status, "status");

    const newCaseFile = await CaseFile.create({
      numExp: numExp.trim(),
      nig: nig.trim(),
      description: description.trim(),
      court: court.trim(),
      status: status.trim(),
      userId: userId,
      // clientId: clientId,
    });

    if (Array.isArray(clientId) && clientId.length > 0) {
      for (const id of clientId) {
        await ClientCaseFile.create({
          ClientId: id,
          CaseFileId: newCaseFile.id,
        });
      }
    }

    const logs = await ClientCaseFile.findAll();
    console.log(logs);

    const userCaseFiles = await CaseFile.findAll({
      where: { userId: userId },
    });

    res.json(userCaseFiles);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getClientCaseFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ message: "Client not found." })
    }

    const clientCaseFiles = Client.findByPk(id, {
      include: {
          model: CaseFile,
          through: { attributes: [] },
      },
    });

    // if (!clientCaseFiles.length) {
    //   return res.status(404).json({ message: "Casefiles not found" })
    // }

    res.json(clientCaseFiles)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
};
