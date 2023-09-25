/**
 * This function wrap async/await function with try catch block
 *
 * @param {function(...args) : Promise<any> | any} fn
 * @returns {function(...args) : Promise<any>}
 */
const wrapperFunction = (fn) => {
  return async function _dummyFunc(...args) {
    try {
      const result = await fn.apply(this, args);
      return result;
    } catch (error) {
      throw new Error(error.message);
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
    if (object[key] && typeof object[key] === "function") {
      // Wrap function with try catch
      result[key] = wrapperFunction(object[key]);
    }
  });
  return result;
};
