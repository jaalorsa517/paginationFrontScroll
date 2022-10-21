export async function httpGet(url, { headers = {} } = {}) {
  const response = await fetch(url, { method: "GET", headers });
  const responseJson = await response.json();
  return responseJson;
}
