import { Router } from "express";
import { createDebt, getDebts } from "../controllers/debts.controllers.js";

const router = Router();

// router.get("/user/:id/debts");
// router.get("/debts/:id");
router.get("/clients/:id/debts", getDebts);
router.post("/clients/:id/debts", createDebt);
// router.put("/debts/:id");
router.delete("/debts/:id");

export default router;