import { Router } from "express";
import { getAssignmentsController } from "../controllers/assignments.controller";

const router = Router();

router.get("/", getAssignmentsController);
router.post("/upload-file", (req, res) => {})

export default router;