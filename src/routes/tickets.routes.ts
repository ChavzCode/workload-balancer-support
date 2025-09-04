import { Router } from "express";
import { getTicketsByAssigneeController, getTicketsComplianceRiskController, getTicketsController, postTicketAllocationController, postUploadTicketsFile } from "../controllers/tickets.controller";
import { upload } from "../infrastructure/middleware/file-upload.middleware";
import { uploadFileController } from "../controllers/upload.controller";

const router = Router();

router.get("/", getTicketsController);
router.get("/group-by-assignee", getTicketsByAssigneeController);
router.get("/compliance-risk", getTicketsComplianceRiskController);
router.post("/allocate", postTicketAllocationController);
router.post("/upload-file", upload.single("file"), uploadFileController, postUploadTicketsFile);

export default router;