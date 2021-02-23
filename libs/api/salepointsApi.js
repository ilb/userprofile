import { getData } from './apiHelpers';

export async function changeSalepoint(salepointCode) {
  return getData(
    fetch('api/salepointChange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ salepointCode })
    })
  );
}

export async function loadSalepoints() {
  return getData(
    fetch('api/salepointsLoad', {
      method: 'GET'
    })
  );
}
