import Response from '../../libs/utils/Response.mjs';

export default class SalepointChange {
  constructor({ salepointService }) {
    this.salepointService = salepointService;
  }

  async process(req) {
    const salepointCode = req.body.salepointCode;

    try {
      await this.salepointService.changeCurrentSalepoint(salepointCode);
      return Response.ok('Текущая точка продаж изменена');
    } catch (err) {
      return Response.internalError();
    }
  }

  async schema(req) {
    const schema = {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          properties: {
            salepointCode: {
              type: 'string'
            }
          },
          required: ['salepointCode']
        }
      }
    };
    return schema;
  }
}
