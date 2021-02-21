/**
 * Search use case
 */
export default class SalepointSelect {
  constructor({ salepointProvider, salepointService }) {
    this.salepointProvider = salepointProvider;
    this.salepointService = salepointService;
  }
  /**
   * process use case
   * @param {*} request input params
   */
  async process(request) {
    const result = {};
    const salepoints = await this.salepointProvider.getSalepoints(this.currentUser);
    const currentSalepoint = await this.salepointService.getCurrentSalepoint();

    const { name, code } = currentSalepoint;
    result.currentSalepoint = { name, code };
    result.salepoints = salepoints
      .filter(({ code }) => code !== currentSalepoint.code)
      .map(({ name, code }) => ({ name, code }));
    // if (request.q) {
    //   result.rows = await this.dictionaryRepository.search(request.q);
    // }
    return result;
  }

  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  async schema(request) {
    // const schema = {};
    // const salepoints = await this.salepointProvider.getSalepoints(this.currentUser);
    const schema = {
      type: 'object',
      properties: {
        // salepointCode: {
        //   title: 'Точка продаж',
        //   type: 'string',
        //   enum: salepoints.map((sp) => sp.name),
        //   options: []
        // }
      },
      required: ['salepointCode']
    };
    // console.log({ schema });
    return schema;
  }
}
