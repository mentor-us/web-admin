const wrapperFunction = (fn) => {
  return async function _dummyFunc(...args) {
    try {
      const result = await fn.apply(this, args);
      return result;
    } catch (ex) {
      throw new Error(ex.message);
    }
  };
};

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
