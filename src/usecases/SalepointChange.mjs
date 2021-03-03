export default class SalepointChange {
  constructor({ salepointProvider, salepointService, userService }) {
    this.salepointService = salepointService;
    this.salepointProvider = salepointProvider;
    this.userService = userService;
  }

  async process(req) {
    const salepointCode = req.body.salepointCode;
    const salepoints = await this.salepointProvider.getSalepoints();
    const salepoint = salepoints.find((sp) => sp.code === salepointCode);
    if (salepoint) {
      const { name, code } = salepoint;
      await this.salepointService.createSalepoint(name, code);
      await this.salepointService.changeCurrentSalepoint(salepointCode);
    }
    return null;
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
