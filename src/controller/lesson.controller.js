import * as lessonService from "../service/lesson.service.js";

export const createLesson = async (req, res, next) => {
    try {
        const { classId } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;
        
        const lesson = await lessonService.createLesson(classId, req.body, userId, userRole);
        res.status(201).json({
            message: "Tạo bài học thành công",
            data: lesson
        });
    } catch (error) {
        next(error);
    }
};

export const getLessonsByClass = async (req, res, next) => {
    try {
        const { classId } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const lessons = await lessonService.getLessonsByClass(classId, userId, userRole);
        res.status(200).json({
            data: lessons
        });
    } catch (error) {
        next(error);
    }
};

export const completeLesson = async (req, res, next) => {
    try {
        const { id: lessonId } = req.params;
        const userId = req.user.id;

        const progress = await lessonService.completeLesson(lessonId, userId);
        res.status(200).json({
            message: "Đã hoàn thành bài học",
            data: progress
        });
    } catch (error) {
        next(error);
    }
};

export const getLearningProgress = async (req, res, next) => {
    try {
        const { classId } = req.params;
        const userId = req.user.id;

        const progressData = await lessonService.getLearningProgress(classId, userId);
        res.status(200).json({
            data: progressData
        });
    } catch (error) {
        next(error);
    }
};