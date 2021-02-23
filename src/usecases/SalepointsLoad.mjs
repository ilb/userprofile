import Response from '../../libs/utils/Response.mjs';

export default class SalepointLoad {
  constructor({ salepointProvider, salepointService }) {
    this.salepointProvider = salepointProvider;
    this.salepointService = salepointService;
  }

  async loadSalepoints() {
    const salepoints = await this.salepointProvider.getSalepoints(this.currentUser);
    const currentSalepoint = await this.salepointService.getCurrentSalepoint();

    return salepoints
      .map(({ name, code }) => ({
        name,
        code,
        isCurrent: code === currentSalepoint.code
      }))
      .sort((a, b) => (a.isCurrent === b.isCurrent ? 0 : a.isCurrent ? -1 : 1));
  }

  async process() {
    try {
      const salepoints = await this.loadSalepoints();
      return Response.ok('Точки продаж загружены', { salepoints });
    } catch (err) {
      return Response.internalError();
    }
  }

  async schema(req) {
    return {};
  }
}
