import { Router } from "express";
import { createCaseFile, getClientCaseFiles, getUserCaseFiles } from "../controllers/caseFile.controllers.js";

const router = Router();

// router.get("/casefiles");
// router.get("/casefile/:id");
router.get("/user/casefiles", getUserCaseFiles);
router.get("/clients/:id/casefiles", getClientCaseFiles);

router.post("/user/casefiles", createCaseFile);

// router.put("/casefile/:id");

// router.delete("/casefile/:id");

export default router;