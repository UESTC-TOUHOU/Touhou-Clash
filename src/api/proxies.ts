import { getURLAndInit } from '../misc/request-helper';

const endpoint = '/proxies';

/*
$ curl "http://127.0.0.1:8080/proxies/Proxy" -XPUT -d '{ "name": "ss3" }' -i
HTTP/1.1 400 Bad Request
Content-Type: text/plain; charset=utf-8

{"error":"Selector update error: Proxy does not exist"}

~
$ curl "http://127.0.0.1:8080/proxies/GLOBAL" -XPUT -d '{ "name": "Proxy" }' -i
HTTP/1.1 204 No Content
*/

export async function fetchProxies(config) {
  const { url, init } = getURLAndInit(config);
  const res = await fetch(url + endpoint, init);
  return await res.json();
}

export async function requestToSwitchProxy(apiConfig, name1, name2) {
  const body = { name: name2 };
  const { url, init } = getURLAndInit(apiConfig);
  const fullURL = `${url}${endpoint}/${name1}`;
  return await fetch(fullURL, {
    ...init,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export async function requestDelayForProxy(
  apiConfig,
  name,
  latencyTestUrl = 'https://www.gstatic.com/generate_204'
) {
  const { url, init } = getURLAndInit(apiConfig);
  const qs = `timeout=5000&url=${encodeURIComponent(latencyTestUrl)}`;
  const fullURL = `${url}${endpoint}/${encodeURIComponent(name)}/delay?${qs}`;
  return await fetch(fullURL, init);
}

export async function requestDelayForProxyGroup(
  apiConfig,
  name,
  latencyTestUrl = 'http://www.gstatic.com/generate_202'
) {
  const { url, init } = getURLAndInit(apiConfig);
  const qs = `url=${encodeURIComponent(latencyTestUrl)}&timeout=2000`;
  const fullUrl = `${url}/group/${encodeURIComponent(name)}/delay?${qs}`;
  return await fetch(fullUrl, init);
}

export async function fetchProviderProxies(config) {
  const { url, init } = getURLAndInit(config);
  const res = await fetch(url + '/providers/proxies', init);
  if (res.status === 404) {
    return { providers: {} };
  }
  return await res.json();
}

export async function updateProviderByName(config, name) {
  const { url, init } = getURLAndInit(config);
  const options = { ...init, method: 'PUT' };
  return await fetch(url + '/providers/proxies/' + encodeURIComponent(name), options);
}

export async function healthcheckProviderByName(config, name) {
  const { url, init } = getURLAndInit(config);
  const options = { ...init, method: 'GET' };
  return await fetch(
    url + '/providers/proxies/' + encodeURIComponent(name) + '/healthcheck',
    options
  );
}
