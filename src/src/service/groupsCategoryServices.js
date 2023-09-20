import GroupCategoryApi from "api/GroupCategoryApi";
import getMessage from "utils/message";

const getAllCategories = async () => {
  try {
    const response = await GroupCategoryApi.all();
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const addNewCategory = async (req) => {
  try {
    const response = await GroupCategoryApi.add(req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const editCategory = async (id, req) => {
  try {
    const response = await GroupCategoryApi.update(id, req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const deleteCategory = async (id, req) => {
  try {
    const response = await GroupCategoryApi.delete(id, req);

    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const deleteMultipleCategories = async (req) => {
  try {
    const response = await GroupCategoryApi.deleteMultiple(req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const searchCategory = async (req) => {
  try {
    const response = await GroupCategoryApi.search(req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupCategory = async (req) => {
  try {
    const response = await GroupCategoryApi.exportGroupCategory(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const getPermissions = async (req) => {
  try {
    const response = await GroupCategoryApi.getPermissions(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const exportGroupCategorySearch = async (req) => {
  try {
    const response = await GroupCategoryApi.exportGroupCategorySearch(req);
    return response;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

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
export default groupsCategoryServices;
