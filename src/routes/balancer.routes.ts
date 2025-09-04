import { Router } from "express";
import { getAllocateTicketBalancerController, getWhoIsNextController, getWorkloadBalanceController } from "../controllers/balancer.controller";

const router = Router();

router.get("/balancer", getWorkloadBalanceController)
router.get("/balancer/who-is-next", getWhoIsNextController)
router.post("/balancer/allocate-ticket", getAllocateTicketBalancerController )

export default router; 