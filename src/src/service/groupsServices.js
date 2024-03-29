import { calculateDays } from "utils";
import GroupApi from "api/GroupApi";

import ServerError from "errors/ServerError";

import ErrorWrapper from "./ErrorServiceWrapper";

const getAllGroups = (req) => GroupApi.all(req).then((res) => res.data);

const getGroup = (id) => GroupApi.findById(id);

const searchGroup = async (req) => {
  const response = await GroupApi.search(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const addNewGroup = async (req) => {
  const response = await GroupApi.add(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode, response.data);
  }

  return response.data;
};

const enableGroup = async (req) => {
  const response = await GroupApi.enableGroup(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const disableGroup = async (req) => {
  const response = await GroupApi.disableGroup(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const importGroups = async (req) => {
  const response = await GroupApi.importSheet(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const editGroup = async (id, req) => {
  const response = await GroupApi.update(id, req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const getTemplate = () => GroupApi.getTemplate();

const deleteGroup = async (req) => {
  const response = await GroupApi.delete(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const checkRequestDataCreateGroup = (req, fromToRange) => {
  const today = new Date();

  // kiểm tra ngày kết thúc so với hiện tại
  if (req.timeEnd.getTime() <= today.getTime()) {
    return {
      status: false,
      message: "Thời gian kết thúc phải lớn hơn thời điểm hiện tại!"
    };
  }

  // kiểm tra ngày kết thúc so với ngày bắt đầu
  if (req.timeEnd.getTime() <= req.timeStart.getTime()) {
    return {
      status: false,
      message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu!"
    };
  }

  // kiểm tra ngày kết thúc có xa hơn ngày bắt đầu so với cấu hình cấu hình
  if (calculateDays(req.timeEnd, req.timeStart, "year") > fromToRange) {
    return {
      status: false,
      message: `Thời gian kết thúc không được lớn hơn thời gian bắt đầu quá ${fromToRange} năm!`
    };
  }

  // kiểm tra trạng thái của thời gian bắt đầu so với hiện tại
  if (req.timeStart.getTime() > today.getTime()) {
    req.status = "INACTIVE";
  }

  return {
    status: true,
    message: "",
    data: req
  };
};

const checkRequestDataEditGroup = (req, fromToRange) => {
  // kiểm tra ngày kết thúc so với ngày bắt đầu
  if (req.timeEnd.getTime() <= req.timeStart.getTime()) {
    return {
      status: false,
      message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu!"
    };
  }

  // kiểm tra ngày kết thúc có xa hơn ngày bắt đầu so với cấu hình cấu hình
  if (calculateDays(req.timeEnd, req.timeStart, "year") > fromToRange) {
    return {
      status: false,
      message: `Thời gian kết thúc không được lớn hơn thời gian bắt đầu quá ${fromToRange} năm!`
    };
  }

  return {
    status: true,
    message: "",
    data: req
  };
};

const deleteMultipleGroups = async (req) => {
  const response = await GroupApi.deleteMultiple(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const exportGroup = (req) => GroupApi.exportGroup(req);

const exportGroupMentee = (id, req) => GroupApi.exportGroupMentee(id, req);

const exportGroupMentor = (id, req) => GroupApi.exportGroupMentor(id, req);

const exportGroupSearch = (req) => GroupApi.exportGroupSearch(req);

const groupsServices = {
  getAllGroups,
  getGroup,
  addNewGroup,
  editGroup,
  deleteGroup,
  importGroups,
  searchGroup,
  checkRequestDataCreateGroup,
  checkRequestDataEditGroup,
  deleteMultipleGroups,
  getTemplate,
  enableGroup,
  disableGroup,
  exportGroup,
  exportGroupMentee,
  exportGroupMentor,
  exportGroupSearch
};
export default ErrorWrapper(groupsServices);
