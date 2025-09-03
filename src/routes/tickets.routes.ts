import { Router } from "express";
import { getTicketsComplianceRiskController, getTicketsController, postTicketAllocationController } from "../controllers/tickets.controller";

const router = Router();

router.get("/", getTicketsController);
router.get("/compliance-risk", getTicketsComplianceRiskController)
router.post("/allocate", postTicketAllocationController)

export default router;