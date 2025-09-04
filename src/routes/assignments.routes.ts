import { Router } from "express";
import {
  clearAssignmentsController,
  getAssignmentsController,
  getAssignmentsGroupedByAssigneeController,
  uploadAssignmentsFileController,
} from "../controllers/assignments.controller";
import { upload } from "../infrastructure/middleware/file-upload.middleware";
import { uploadFileController } from "../controllers/upload.controller";

const router = Router();

router.get("/", getAssignmentsController);
router.get("/grouped-by-assignee", getAssignmentsGroupedByAssigneeController);
router.delete("/clear", clearAssignmentsController);
router.post(
  "/upload-file",
  upload.single("file"),
  uploadFileController,
  uploadAssignmentsFileController,
);

export default router;
