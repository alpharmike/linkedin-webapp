export const enableError = (error, msg, type) => {
  error.message = msg;
  error.type = type;
  error.status = true;
}
