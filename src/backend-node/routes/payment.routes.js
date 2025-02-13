import { Router } from "express";
import { debtToPayment, deletePayment, getPayments } from "../controllers/payments.controllers.js";

const router = Router();

router.get("/client/:id/payments", getPayments);
router.post("/payments/:id", debtToPayment);
router.delete("/payments/:id", deletePayment)

export default router;

