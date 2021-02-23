import { processUsecaseApi } from '../../libs/usecases/index.mjs';

export default async function salepointsLoad(req, res) {
  const { httpCode, ...restResponse } = await processUsecaseApi(req, 'salepointsLoad');
  res.status(httpCode).json(restResponse);
}
