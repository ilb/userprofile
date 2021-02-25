/**
 * Search use case
 */
export default class SalepointSelect {
  constructor({ salepointProvider, salepointService, currentUser }) {
    this.salepointProvider = salepointProvider;
    this.salepointService = salepointService;
    this.currentUser = currentUser;
  }
  /**
   * process use case
   * @param {*} request input params
   */
  async process(request) {
    const salepoints = await this.salepointProvider.getSalepoints(this.currentUser);
    const currentSalepoint = await this.salepointService.getCurrentSalepoint();

    return {
      salepoints: salepoints
        .map(({ name, code }) => ({
          name,
          code,
          isCurrent: code === currentSalepoint.code
        }))
        .sort((a, b) => (a.isCurrent === b.isCurrent ? 0 : a.isCurrent ? -1 : 1))
    };
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
