import { processUsecaseApi } from '../../libs/usecases/index.mjs';

export default async function salepointChange(req, res) {
  const { httpCode, ...restResponse } = await processUsecaseApi(req, 'salepointChange');
  res.status(httpCode).json(restResponse);
}
