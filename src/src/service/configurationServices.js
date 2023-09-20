import SystemConfigApi from "api/SystemConfigApi";
import getMessage from "utils/message";

const getAllConfiguration = async () => {
  try {
    const response = await SystemConfigApi.getAll();
    const result = {
      fromToRange: {},
      emailDomainsValid: {}
    };

    response.data.forEach((element) => {
      if (element.key === "valid_domain") {
        result.emailDomainsValid = element;
      } else if (element.key === "valid_max_year") {
        result.fromToRange = element;
      }
    });

    return result;
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const updateConfiguration = async (id, req) => {
  try {
    const response = await SystemConfigApi.update(id, req);
    if (response.returnCode === 200) {
      return response.data;
    }

    throw new Error(response.returnCode);
  } catch (error) {
    throw new Error(getMessage(parseInt(error.message, 10)));
  }
};

const configurationServices = {
  getAllConfiguration,
  updateConfiguration
};

export default configurationServices;
