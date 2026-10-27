import pool from "../config/db.config.js";

export const createClass = async ({ name, description, created_by }) => {
  const result = await pool.query(
    `INSERT INTO classes (name, description, created_by)
     VALUES ($1, $2, $3)
     RETURNING id, name, description, created_by AS "createdBy", created_at AS "createdAt"`,
    [name, description || null, created_by]
  );
  return result.rows[0];
};

export const findAllClasses = async () => {
  const result = await pool.query(
    `SELECT c.id, c.name, c.description, c.created_by AS "createdBy", u.name AS "creatorName", c.created_at AS "createdAt"
     FROM classes c
     LEFT JOIN users u ON c.created_by = u.id
     ORDER BY c.id DESC`
  );
  return result.rows;
};

export const findClassById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, description, created_by AS "createdBy", created_at AS "createdAt"
     FROM classes WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

export const findMemberInClass = async (class_id, user_id) => {
  const result = await pool.query(
    `SELECT * FROM class_members WHERE class_id = $1 AND user_id = $2`,
    [class_id, user_id]
  );
  return result.rows[0] || null;
};

export const addMemberToClass = async (class_id, user_id, role_in_class = "STUDENT") => {
  const result = await pool.query(
    `INSERT INTO class_members (class_id, user_id, role_in_class)
     VALUES ($1, $2, $3)
     RETURNING id, class_id AS "classId", user_id AS "userId", role_in_class AS "roleInClass", joined_at AS "joinedAt"`,
    [class_id, user_id, role_in_class]
  );
  return result.rows[0];
};

export const findClassMembers = async (class_id) => {
  const result = await pool.query(
    `SELECT cm.id, cm.user_id AS "userId", u.name, u.email, cm.role_in_class AS "roleInClass", cm.joined_at AS "joinedAt"
     FROM class_members cm
     JOIN users u ON cm.user_id = u.id
     WHERE cm.class_id = $1
     ORDER BY cm.joined_at ASC`,
    [class_id]
  );
  return result.rows;
};