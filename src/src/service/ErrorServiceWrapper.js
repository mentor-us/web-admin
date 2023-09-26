import ClientError from "errors/ClientError";
import ServerError from "errors/ServerError";

/**
 * This function wrap async/await function with try catch block
 *
 * @param {function(...args) : Promise<any> | any} fn
 * @returns {function(...args) : Promise<any>}
 */
const wrapperFunction = (fn) => {
  return function _dummyFunc(...args) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      if (error instanceof ServerError) throw error;
      else if (error instanceof ClientError) throw error;
      else throw new ClientError(error.message);
    }
  };
};

/**
 * Wrap all function in object with try catch block
 * Don't need to wrap function in object manually
 * @param {object} object
 * @returns {object}
 */
export default (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (typeof object[key] === "function") {
      // Wrap function with try catch
      result[key] = wrapperFunction(object[key]);
    }
  });
  return result;
};
