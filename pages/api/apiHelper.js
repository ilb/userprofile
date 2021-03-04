import { processUsecaseApi } from '../../libs/usecases/index.mjs';

export async function processApi(req, res, useCase) {
  const { httpCode, data } = await processUsecaseApi(req, useCase);
  res.statusCode = httpCode;

  let contentType = 'application/json';
  if (typeof data === 'string') {
    contentType = 'text/plain';
  }
  res.setHeader('Content-Type', contentType);
  res.status(httpCode).send(data);
}
