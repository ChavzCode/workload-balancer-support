import { Router } from "express";
import { getTicketsComplianceRiskController, getTicketsController } from "../controllers/tickets.controller";

const router = Router();

router.get("/", getTicketsController);
router.get("/compliance-risk", getTicketsComplianceRiskController)

export default router;