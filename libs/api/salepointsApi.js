export async function changeSalepoint(salepointCode) {
  return fetch('api/salepointChange', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salepointCode })
  });
}
