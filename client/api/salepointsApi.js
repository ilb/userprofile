export async function changeSalepoint(salepointCode) {
  const result = await fetch('api/salepointChange', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ salepointCode })
  });
  if (result.status === 204) {
    return null;
  }
  if (result.headers.get('Content-Type') === 'text/plain') {
    return result.text();
  } else {
    return result.json();
  }
}
