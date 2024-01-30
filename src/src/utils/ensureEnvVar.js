export default () => {
  const reactEnv = import.meta.env;
  const reactPrefix = "REACT_APP_";
  const requiredEnvVars = ["BACKEND_URL", "ITEMS_PER_PAGE"];
  const missingEnvVars = requiredEnvVars.filter((key) => !reactEnv[`${reactPrefix}${key}`]);
  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing environment variables: ${missingEnvVars
        .map((value) => reactPrefix + value)
        .join(", ")}`
    );
  }
};
