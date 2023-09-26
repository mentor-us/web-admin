import getMessage from "utils/message";

class ServerError extends Error {
  constructor(serverErrorCode, data) {
    super(getMessage(parseInt(serverErrorCode, 10), data));
    this.name = "ServerError";
    this.data = data;
  }
}

export default ServerError;
