export default class Response {
  static createResponse(httpCode, message, data = {}) {
    return { httpCode, message, data };
  }
  static ok(data = {}) {
    return Response.createResponse(200, null, data);
  }
  static noContent() {
    return Response.createResponse(204, null);
  }
  static badRequest(message) {
    return Response.createResponse(400, message);
  }
  static internalError(message = 'Ошибка на сервере') {
    return Response.createResponse(500, message);
  }
}
