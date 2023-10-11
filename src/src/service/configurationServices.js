import SystemConfigApi from "api/SystemConfigApi";

import ServerError from "errors/ServerError";

import ErrorWrapper from "./ErrorServiceWrapper";

const getAllConfiguration = async () => {
  const response = await SystemConfigApi.getAll();
  const result = {
    /**
     * @deprecated since version 0.1.1 - use maxLearningYear instead
     */
    fromToRange: {},
    emailDomainsValid: {},
    /**
     * @since version 0.1.1
     */
    maxLearningYear: {}
  };

  response.data.forEach((element) => {
    if (element.key === "valid_domain") {
      result.emailDomainsValid = element;
    } else if (element.key === "valid_max_year") {
      result.fromToRange = element;
      result.maxLearningYear = element;
    }
  });

  return result;
};

const updateConfiguration = async (id, req) => {
  const response = await SystemConfigApi.update(id, req);

  if (response.returnCode !== 200) {
    throw new ServerError(response.returnCode);
  }

  return response.data;
};

const configurationServices = {
  getAllConfiguration,
  updateConfiguration
};

export default ErrorWrapper(configurationServices);
