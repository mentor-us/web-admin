import { ServerError } from "errors";
import GroupCategoryApi from "api/GroupCategoryApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const getAllCategories = () => GroupCategoryApi.all();

const addNewCategory = async (req) => {
  const response = await GroupCategoryApi.add(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const editCategory = async (id, req) => {
  const response = await GroupCategoryApi.update(id, req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const deleteCategory = async (id, req) => {
  const response = await GroupCategoryApi.delete(id, req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const deleteMultipleCategories = async (req) => {
  const response = await GroupCategoryApi.deleteMultiple(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const searchCategory = async (req) => {
  const response = await GroupCategoryApi.search(req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const exportGroupCategory = (req) => GroupCategoryApi.exportGroupCategory(req);

const getPermissions = (req) => GroupCategoryApi.getPermissions(req);

const exportGroupCategorySearch = (req) => GroupCategoryApi.exportGroupCategorySearch(req);

const groupsCategoryServices = {
  getAllCategories,
  addNewCategory,
  editCategory,
  deleteCategory,
  deleteMultipleCategories,
  searchCategory,
  exportGroupCategory,
  getPermissions,
  exportGroupCategorySearch
};

export default ErrorWrapper(groupsCategoryServices);
