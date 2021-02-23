export function createResponse(httpCode, message, data = {}) {
  return { httpCode, message, data };
}
export const response = {
  ok: function (message, data = {}) {
    return createResponse(200, message, data);
  },
  badRequest: function (message, data = {}) {
    return createResponse(400, message, data);
  },
  internalError: function (message, data = {}) {
    return createResponse(500, message, data);
  }
};
