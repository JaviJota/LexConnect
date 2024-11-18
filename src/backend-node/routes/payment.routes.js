import { Router } from "express";
import { debtToPayment } from "../controllers/payments.controllers.js";

const router = Router();

router.get("/client/:id/payments");
router.post("/payments/:id", debtToPayment);

export default router;

