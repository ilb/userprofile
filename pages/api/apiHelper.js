import { processUsecaseApi } from '../../libs/usecases/index.mjs';

export async function processApi(req, res, useCase) {
  const { httpCode, ...restResponse } = await processUsecaseApi(req, useCase);
  res.status(httpCode).json(restResponse);
}
