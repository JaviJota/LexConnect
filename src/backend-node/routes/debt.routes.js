import { Router } from "express";
import { createDebt, deleteDebt, getDebts } from "../controllers/debts.controllers.js";

const router = Router();

router.get("/clients/:id/debts", getDebts);
router.post("/clients/:id/debts", createDebt);
router.delete("/debts/:id", deleteDebt);

export default router;

// -------------
// router.get("/user/:id/debts");
// router.get("/debts/:id");
// router.put("/debts/:id");