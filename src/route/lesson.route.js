import express from "express";
import * as lessonController from "../controller/lesson.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/classes/:classId/lessons", authenticateToken, lessonController.createLesson);
router.get("/classes/:classId/lessons", authenticateToken, lessonController.getLessonsByClass);
router.post("/lessons/:id/complete", authenticateToken, lessonController.completeLesson);
router.get("/classes/:classId/progress", authenticateToken, lessonController.getLearningProgress);

export default router;