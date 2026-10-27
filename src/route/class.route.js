import { Router } from "express";
import * as classController from "../controller/class.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { validate, createClassRules } from "../middleware/validate.js";

const router = Router();

router.use(authenticateToken);
router.post("/", requireAdmin, validate(createClassRules), classController.createClass);
router.get("/", classController.getAllClasses);
router.get("/:id", classController.getClassDetail);
router.post("/:id/join", classController.joinClass);
router.get("/:id/members", classController.getClassMembers);

export default router;