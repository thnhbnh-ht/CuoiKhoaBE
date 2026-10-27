import * as lessonRepository from "../repository/lesson.repository.js";
import pool from "../config/db.config.js";

const isMentorOfClass = async (classId, userId) => {
    const query = `SELECT mentor_id FROM classes WHERE id = $1;`;
    const result = await pool.query(query, [classId]);
    if (result.rows.length === 0) return false;
    return result.rows[0].mentor_id === userId;
};

const isMemberOfClass = async (classId, userId) => {
    const query = `SELECT * FROM class_members WHERE class_id = $1 AND member_id = $2;`;
    const result = await pool.query(query, [classId, userId]);
    return result.rows.length > 0;
};

export const createLesson = async (classId, lessonData, userId, userRole) => {
    const isMentor = await isMentorOfClass(classId, userId);
    
    if (userRole !== "ADMIN" && !isMentor) {
        throw new Error("Chỉ Mentor của lớp học này mới được phép tạo bài học.");
    }

    return await lessonRepository.createLesson({
        classId,
        ...lessonData,
        createdBy: userId
    });
};
export const getLessonsByClass = async (classId, userId, userRole) => {
    const isMentor = await isMentorOfClass(classId, userId);
    const isMember = await isMemberOfClass(classId, userId);

    if (userRole !== "ADMIN" && !isMentor && !isMember) {
        throw new Error("Bạn không có quyền xem bài học của lớp này.");
    }

    return await lessonRepository.findLessonsByClassId(classId);
};
export const completeLesson = async (lessonId, userId) => {
    const lesson = await lessonRepository.findLessonById(lessonId);
    if (!lesson) {
        throw new Error("Bài học không tồn tại.");
    }

    const isMember = await isMemberOfClass(lesson.class_id, userId);
    if (!isMember) {
        throw new Error("Bạn không thuộc lớp học này để hoàn thành bài.");
    }

    return await lessonRepository.completeLesson(lessonId, userId);
};
export const getLearningProgress = async (classId, userId) => {
    const isMember = await isMemberOfClass(classId, userId);
    if (!isMember) {
        throw new Error("Bạn không thuộc lớp học này để xem tiến độ.");
    }

    return await lessonRepository.getLearningProgress(classId, userId);
};