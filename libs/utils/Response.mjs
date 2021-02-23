export default class Response {
  static createResponse(httpCode, message, data = {}) {
    return { httpCode, message, data };
  }
  static ok(message, data = {}) {
    return Response.createResponse(200, message, data);
  }
  static badRequest(message, data = {}) {
    return Response.createResponse(400, message, data);
  }
  static internalError(message = 'Ошибка на сервере', data = {}) {
    return Response.createResponse(500, message, data);
  }
}
