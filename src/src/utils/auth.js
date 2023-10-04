import jwtDecode from "jwt-decode";

export const isExpiredToken = (token) => {
  if (!token) return true;

  const decode = jwtDecode(token);
  const expirationDate = decode.exp;
  const currentTime = Date.now() / 1000;
  if (expirationDate > currentTime) return false;

  return true;
};

export function isAuthenticated() {
  const token = localStorage.getItem("access_token");
  return Boolean(token && !isExpiredToken(token));
}
