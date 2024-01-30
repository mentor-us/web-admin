import GroupApi from "api/GroupApi";

import ServerError from "errors/ServerError";

const getGroup = async (id) => {
  const response = await GroupApi.findById(id);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const addMember = async (id, req, type) => {
  const response = await GroupApi.addDetail(id, req, type);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const setRoleMember = async (id, req, type) => {
  let response;
  if (type === 0) {
    response = await GroupApi.promoteToMentor(id, req);
  } else {
    response = await GroupApi.demoteToMentee(id, req);
  }

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const deleteDetail = async (idGroup, idUser, type) => {
  const response = await GroupApi.deleteDetail(idGroup, idUser, type);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const groupDetailServices = {
  getGroup,
  addMember,
  setRoleMember,
  deleteDetail
};
export default groupDetailServices;
