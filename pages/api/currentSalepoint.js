import { processApi } from './apiHelper';

export default async function currentSalepoint(req, res) {
  await processApi(req, res, 'currentSalepoint');
}
