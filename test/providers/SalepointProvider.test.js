import { UriAccessorFactory } from '@ilb/uriaccessorjs';

import SalepointProvider from '../../src/providers/SalepointProvider';

const salepointsByUserUrl = 'file://test/providers/getSalepointByUser.xml';
const currentUser = process.env.USER;
const uriAccessorFactory = new UriAccessorFactory({
  currentUser,
  uriAccessorFileEnabled: true
});
const provider = new SalepointProvider({ salepointsByUserUrl, uriAccessorFactory });
const expected = [
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
it('getSalepoints', async () => {
  const res = await provider.getSalepoints(currentUser);
  // console.log({ res });
  expect(res).toBe(expected);
});
