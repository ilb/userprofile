import fetch from 'isomorphic-fetch';
import { processUsecaseApi } from '../../libs/usecases/index.mjs';

export default async function salepointChange(req, res) {
  const { statusCode, ...response } = await processUsecaseApi(req, 'salepontChange');
  res.status(statusCode).json({ response });
}

export async function changeSalepoint(salepointCode) {
  return fetch('api/salepointChange', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salepointCode })
  });
}
