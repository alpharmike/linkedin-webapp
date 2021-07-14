export const enableSnackbar = (body, msg, type) => {
  body.message = msg;
  body.type = type;
  body.status = true;
}
