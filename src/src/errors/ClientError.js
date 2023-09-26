import getMessage from "./message";

class ClientError extends Error {
  constructor(clientErrorCode, data) {
    super(getMessage(parseInt(clientErrorCode, 10), data));
    this.name = "ClientError";
  }
}

export default ClientError;
