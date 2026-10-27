import * as classRepository from "../repository/class.repository.js";
import { NotFoundError, ConflictError, ForbiddenError } from "../core/error.response.js";

export const createClass = async (classData, userId) => {
  return await classRepository.createClass({
    ...classData,
    created_by: userId,
  });
};

export const getAllClasses = async () => {
  return await classRepository.findAllClasses();
};

export const getClassDetail = async (classId) => {
  const classItem = await classRepository.findClassById(classId);
  if (!classItem) {
    throw new NotFoundError("Không tìm thấy lớp học này!");
  }
  return classItem;
};

export const joinClass = async (classId, userId) => {
  const classItem = await classRepository.findClassById(classId);
  if (!classItem) {
    throw new NotFoundError("Lớp học không tồn tại!");
  }

  const existingMember = await classRepository.findMemberInClass(classId, userId);
  if (existingMember) {
    throw new ConflictError("Bạn đã tham gia lớp học này rồi!");
  }

  return await classRepository.addMemberToClass(classId, userId, "STUDENT");
};

export const getClassMembers = async (classId) => {
  const classItem = await classRepository.findClassById(classId);
  if (!classItem) {
    throw new NotFoundError("Lớp học không tồn tại!");
  }
  return await classRepository.findClassMembers(classId);
};