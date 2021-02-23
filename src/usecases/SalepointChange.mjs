import { response } from '../helpers/responseHelper';

export default class SalepointChange {
  constructor({ salepointService }) {
    this.salepointService = salepointService;
  }

  async process(request) {
    // if (!request.salepointCode) {
    //   return response.badRequest('В запросе отсутствует salepointCode');
    // }
    // try {
    //   await this.salepointService.changeCurrentSalepoint(request.salepointCode);
    //   return response.ok('Текущая точка продаж изменена');
    // } catch (err) {
    //   return response.internalError('Ошибка на сервере');
    // }
    return response.ok('Тест');
  }
}
