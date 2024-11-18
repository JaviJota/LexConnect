import { Router } from "express";
import { createClient, getClient, getUserClients } from "../controllers/clients.controllers.js";

const router = Router();

router.get("/clients");
router.get("/clients/:id", getClient);
router.get("/users/:id/clients", getUserClients);
router.post("/clients", createClient);
router.put("/clients/:id");
router.delete("/clients/:id");

export default router;