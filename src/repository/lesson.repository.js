import pool from "../config/db.config.js";

export const createLesson = async ({ classId, title, content, lessonOrder, createdBy }) => {
    const query = `
        INSERT INTO lessons (class_id, title, content, lesson_order, created_by)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await pool.query(query, [classId, title, content, lessonOrder || 1, createdBy]);
    return result.rows[0];
};

export const findLessonsByClassId = async (classId) => {
    const query = `SELECT * FROM lessons WHERE class_id = $1 ORDER BY lesson_order ASC;`;
    const result = await pool.query(query, [classId]);
    return result.rows;
};

export const findLessonById = async (id) => {
    const query = `SELECT * FROM lessons WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export const completeLesson = async (lessonId, memberId) => {
    const query = `
        INSERT INTO lesson_progress (lesson_id, member_id)
        VALUES ($1, $2)
        ON CONFLICT (lesson_id, member_id) DO NOTHING
        RETURNING *;
    `;
    const result = await pool.query(query, [lessonId, memberId]);
    return result.rows[0];
};
export const getLearningProgress = async (classId, memberId) => {
    const query = `
        SELECT 
            (SELECT COUNT(*) FROM lessons WHERE class_id = $1)::INT AS "totalLessons",
            (SELECT COUNT(*) FROM lesson_progress lp 
             JOIN lessons l ON lp.lesson_id = l.id 
             WHERE l.class_id = $1 AND lp.member_id = $2)::INT AS "completedLessons";
    `;
    const result = await pool.query(query, [classId, memberId]);
    const { totalLessons, completedLessons } = result.rows[0];
    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    return { totalLessons, completedLessons, progress };
};