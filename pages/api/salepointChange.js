import { processApi } from './apiHelper';

export default async function salepointChange(req, res) {
  await processApi(req, res, 'salepointChange');
}
