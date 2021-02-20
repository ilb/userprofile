/**
 * Search use case
 */
export default class SalepointSelect {
  constructor({ salepointProvider, currentUser }) {
    this.salepointProvider = salepointProvider;
    this.currentUser = currentUser;
  }
  /**
   * process use case
   * @param {*} request input params
   */
  async process(request) {
    const result = {};
    if (request.q) {
      // result.rows = await this.dictionaryRepository.search(request.q);
    }
    return result;
  }

  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  async schema(request) {
    const salepoints = await this.salepointProvider.getSalepoints(this.currentUser);
    const schema = {
      type: 'object',
      properties: {
        salepointCode: {
          title: 'Точка продаж',
          type: 'string',
          enum: salepoints.map((sp) => sp.name)
        }
      },
      required: ['salepointCode']
    };
    // console.log({ schema });
    return schema;
  }
}
