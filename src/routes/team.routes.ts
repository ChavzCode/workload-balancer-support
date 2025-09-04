import { Router } from "express";
import { addTeamMembersController, clearTeamMembersController, getTeamMembersController } from "../controllers/team.controller";

const router = Router();

router.get("/", getTeamMembersController);
router.post("/add-members", addTeamMembersController );
router.delete("/clear-members", clearTeamMembersController);

export default router;