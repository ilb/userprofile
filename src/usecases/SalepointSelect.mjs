/**
 * Search use case
 */
export default class SalepointSelect {
  constructor({ salepointsLoad }) {
    this.salepointsLoad = salepointsLoad;
  }
  /**
   * process use case
   * @param {*} request input params
   */
  async process(request) {
    return { salepoints: await this.salepointsLoad.loadSalepoints() };
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
