import GroupApi from "api/GroupApi";
import getMessage from "utils/message";

const getGroup = async (id) => {
  try {
    const response = await GroupApi.findById(id);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const addMember = async (id, req, type) => {
  try {
    const response = await GroupApi.addDetail(id, req, type);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const setRoleMember = async (id, req, type) => {
  try {
    const response =
      type === 0 ? await GroupApi.promoteToMentor(id, req) : await GroupApi.demoteToMentee(id, req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const deleteDetail = async (idGroup, idUser, type) => {
  try {
    const response = await GroupApi.deleteDetail(idGroup, idUser, type);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const groupDetailServices = {
  getGroup,
  addMember,
  setRoleMember,
  deleteDetail
};
export default groupDetailServices;
