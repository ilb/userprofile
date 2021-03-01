export default class SalepointChange {
  constructor({ salepointService }) {
    this.salepointService = salepointService;
  }

  async process(req) {
    const userCode = req.query.userCode;
    const { code, name } = await this.salepointService.getCurrentSalepoint(userCode);
    return { code, name };
  }

  async schema(req) {
    const schema = {
      type: 'object',
      properties: {
        query: {
          type: 'object',
          properties: {
            userCode: {
              type: 'string'
            }
          },
          required: ['userCode']
        }
      }
    };
    return schema;
  }
}
