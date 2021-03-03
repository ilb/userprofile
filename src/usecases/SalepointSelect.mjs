/**
 * Search use case
 */
export default class SalepointSelect {
  constructor({ salepointProvider, salepointService, userService }) {
    this.salepointProvider = salepointProvider;
    this.salepointService = salepointService;
    this.userService = userService;
  }
  /**
   * process use case
   * @param {*} request input params
   */
  async process(request) {
    const user = await this.userService.getOrCreateCurrentUser();
    const salepoints = await this.salepointProvider.getSalepoints(user);
    const currentSalepoint = await this.salepointService.getCurrentSalepoint();
    return {
      salepoints: salepoints
        .map(({ name, code }) => ({
          name,
          code,
          isCurrent: (currentSalepoint && code === currentSalepoint.code) || false
        }))
        .sort((a, b) => (a.isCurrent === b.isCurrent ? 0 : a.isCurrent ? -1 : 1))
    };
  }

  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  async schema(request) {
    // const schema = {};
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
