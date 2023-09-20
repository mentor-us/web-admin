import UserApi from "api/UserApi";
// import { groupStatusEnum } from "utils/constants";
import getMessage from "utils/message";

const getAllAccount = async () => {
  try {
    const response = await UserApi.getAllUser();
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getAllAccountPaging = async (req) => {
  try {
    const response = await UserApi.getAllUserPaging(req);
    return response.data;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getListAccountByIDs = async (IDs) => {
  try {
    if (!IDs) return [];
    const response = await UserApi.findByIds(IDs);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getAccountByID = async (ID) => {
  try {
    const response = await UserApi.findById(ID);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getAccountByIDs = async (IDs) => {
  try {
    const response = await UserApi.findByIds(IDs);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const addNewAccount = async (req) => {
  try {
    const response = await UserApi.add(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const deleteAccount = async (req) => {
  try {
    const response = await UserApi.delete(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const disableAccount = async (req) => {
  try {
    const response = await UserApi.disableAccount(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const enableAccount = async (req) => {
  try {
    const response = await UserApi.enableAccount(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const searchAccount = async (req) => {
  try {
    const response = await UserApi.search(req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const editAccount = async (id, req) => {
  try {
    const response = await UserApi.update(id, req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getAccountDetail = async (id) => {
  try {
    const response = await UserApi.getAccountDetail(id);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const deleteMultipleAccount = async (req) => {
  try {
    const response = await UserApi.deleteMultiple(req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const loadByEmail = async (req) => {
  try {
    const response = await UserApi.loadByEmail(req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportAccount = async (req) => {
  try {
    const response = await UserApi.exportAccount(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const importAccount = async (req) => {
  try {
    const response = await UserApi.importAccount(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportAccountMentor = async (id, req) => {
  try {
    const response = await UserApi.exportAccountMentor(id, req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportAccountMentee = async (id, req) => {
  try {
    const response = await UserApi.exportAccountMentee(id, req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportAccountSearch = async (req) => {
  try {
    const response = await UserApi.exportAccountSearch(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const accountServices = {
  getAllAccount,
  getAllAccountPaging,
  getAccountByID,
  addNewAccount,
  deleteAccount,
  getListAccountByIDs,
  disableAccount,
  enableAccount,
  searchAccount,
  editAccount,
  getAccountDetail,
  deleteMultipleAccount,
  loadByEmail,
  getAccountByIDs,
  exportAccount,
  importAccount,
  exportAccountMentor,
  exportAccountMentee,
  exportAccountSearch
};
export default accountServices;
