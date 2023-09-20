import GroupApi from "api/GroupApi";
import { calculateDays } from "utils";
import getMessage from "utils/message";

const getAllGroups = async (req) => {
  try {
    const response = await GroupApi.all(req);
    return response.data;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getGroup = async (id) => {
  try {
    const response = await GroupApi.findById(id);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const searchGroup = async (req) => {
  try {
    const response = await GroupApi.search(req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const addNewGroup = async (req) => {
  let response;
  try {
    response = await GroupApi.add(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    const errorCode = parseInt(error.message, 10);
    if (errorCode === 210) {
      throw new Error(getMessage(errorCode, response.data.join(", ")));
    } else {
      throw new Error(getMessage(errorCode));
    }
  }
};

const enableGroup = async (req) => {
  try {
    const response = await GroupApi.enableGroup(req);
    if (response.returnCode === 200) {
      return response.data;
    }
    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const disableGroup = async (req) => {
  try {
    const response = await GroupApi.disableGroup(req);
    if (response.returnCode === 200) {
      return response.data;
    }
    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const importGroups = async (req) => {
  try {
    const response = await GroupApi.importSheet(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const editGroup = async (id, req) => {
  try {
    const response = await GroupApi.update(id, req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getTemplate = async () => {
  try {
    const response = await GroupApi.getTemplate();
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const deleteGroup = async (req) => {
  try {
    const response = await GroupApi.delete(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
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
  try {
    const response = await GroupApi.deleteMultiple(req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroup = async (req) => {
  try {
    const response = await GroupApi.exportGroup(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupMentee = async (id, req) => {
  try {
    const response = await GroupApi.exportGroupMentee(id, req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupMentor = async (id, req) => {
  try {
    const response = await GroupApi.exportGroupMentor(id, req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupSearch = async (req) => {
  try {
    const response = await GroupApi.exportGroupSearch(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

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
export default groupsServices;
