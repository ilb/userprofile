export default class SalepointProvider {
  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  getSalepoints(user) {
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
