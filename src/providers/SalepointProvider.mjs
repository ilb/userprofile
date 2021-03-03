export default class SalepointProvider {
  constructor({ salepointsByUserUrl, uriAccessorFactory }) {
    this.salepointsByUserUrl = salepointsByUserUrl;
    this.uriAccessorFactory = uriAccessorFactory;
  }
  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  async getSalepoints(user) {
    const uriAccessor = this.uriAccessorFactory.getUriAccessor(this.salepointsByUserUrl);
    const xmldata = await uriAccessor.getContent();
    console.log({ xmldata });
    return [
      {
        code: 'ru.someorg.sales',
        name: 'Департамент розничных продаж'
      },
      {
        code: 'ru.someorg.sales.head',
        name: 'Офис продаж "Головной"'
      },
      {
        code: 'ru.someorg.sales.river',
        name: 'Офис продаж "Речной"'
      }
    ];
  }
}
