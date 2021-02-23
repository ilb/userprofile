export async function getData(response) {
  return response.then((data) => data.json());
}
