import UserApi from "api/UserApi";

import ServerError from "errors/ServerError";

import ErrorWrapper from "./ErrorServiceWrapper";

const getAllAccount = async () => {
  const response = await UserApi.getAllUser();
  return response;
};

const getAllAccountPaging = async (req) => {
  const response = await UserApi.getAllUserPaging(req);
  return response.data;
};

const getListAccountByIDs = async (IDs) => {
  if (!IDs) return [];
  const response = await UserApi.findByIds(IDs);
  return response;
};

const getAccountByID = async (ID) => {
  const response = await UserApi.findById(ID);
  return response;
};

const getAccountByIDs = async (IDs) => {
  const response = await UserApi.findByIds(IDs);
  return response;
};

const addNewAccount = async (req) => {
  const response = await UserApi.add(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const deleteAccount = async (req) => {
  const response = await UserApi.delete(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const disableAccount = async (req) => {
  const response = await UserApi.disableAccount(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const enableAccount = async (req) => {
  const response = await UserApi.enableAccount(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const searchAccount = async (req) => {
  const response = await UserApi.search(req);
  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const editAccount = async (id, req) => {
  const response = await UserApi.update(id, req);
  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const getAccountDetail = async (id) => {
  const response = await UserApi.getAccountDetail(id);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const deleteMultipleAccount = async (req) => {
  const response = await UserApi.deleteMultiple(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const loadByEmail = async (req) => {
  const response = await UserApi.loadByEmail(req);
  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const exportAccount = async (req) => {
  const response = await UserApi.exportAccount(req);
  return response;
};

const importAccount = async (req) => {
  const response = await UserApi.importAccount(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const exportAccountMentor = async (id, req) => {
  const response = await UserApi.exportAccountMentor(id, req);
  return response;
};

const exportAccountMentee = async (id, req) => {
  const response = await UserApi.exportAccountMentee(id, req);
  return response;
};

const exportAccountSearch = async (req) => {
  const response = await UserApi.exportAccountSearch(req);
  return response;
};

const updateProfile = async (req) => {
  const response = await UserApi.updateProfile(req);
  return response;
};
const getMe = () => UserApi.getMe();

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
  exportAccountSearch,
  updateProfile,
  getMe
};

export default ErrorWrapper(accountServices);
