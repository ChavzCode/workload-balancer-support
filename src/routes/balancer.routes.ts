import { Router } from "express";
import { getAssignmentsController, getWorkloadBalanceController } from "../controllers/balancer.controller";

const router = Router();

router.get("/balancer", getWorkloadBalanceController)
router.get("/assignments", getAssignmentsController);

export default router; 