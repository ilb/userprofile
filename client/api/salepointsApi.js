export async function getData(response) {
  return response.then((data) => data.json());
}

export async function changeSalepoint(salepointCode) {
  const result = await fetch('api/salepointChange', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salepointCode })
  });
  if (result.status !== 204) {
    return result.json();
  }
  return result;
}
