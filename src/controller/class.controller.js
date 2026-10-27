import * as classService from "../service/class.service.js";
import catchAsync from "../utils/catchAsync.js";
import { sendSuccess } from "../utils/responseHelper.js";
import { parseId } from "../utils/parseId.js";

export const createClass = catchAsync(async (req, res) => {
  const newClass = await classService.createClass(req.body, req.user.id);
  return sendSuccess(res, 201, "Tạo lớp học thành công!", newClass);
});

export const getAllClasses = catchAsync(async (req, res) => {
  const classes = await classService.getAllClasses();
  return sendSuccess(res, 200, "Lấy danh sách lớp học thành công!", classes);
});

export const getClassDetail = catchAsync(async (req, res) => {
  const classId = parseId(req.params.id);
  const classDetail = await classService.getClassDetail(classId);
  return sendSuccess(res, 200, "Lấy thông tin chi tiết lớp học thành công!", classDetail);
});

export const joinClass = catchAsync(async (req, res) => {
  const classId = parseId(req.params.id);
  const member = await classService.joinClass(classId, req.user.id);
  return sendSuccess(res, 201, "Tham gia lớp học thành công!", member);
});

export const getClassMembers = catchAsync(async (req, res) => {
  const classId = parseId(req.params.id);
  const members = await classService.getClassMembers(classId);
  return sendSuccess(res, 200, "Lấy danh sách học viên trong lớp thành công!", members);
});