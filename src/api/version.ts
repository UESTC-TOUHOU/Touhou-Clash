import { getURLAndInit } from '~/misc/request-helper';
import { ClashAPIConfig } from '~/types';

type VersionData = {
  version?: string;
  premium?: boolean;
  meta?: boolean;
};

export async function fetchVersion(
  endpoint: string,
  apiConfig: ClashAPIConfig
): Promise<VersionData> {
  let json = {};
  try {
    const { url, init } = getURLAndInit(apiConfig);
    const res = await fetch(url + endpoint, init);
    if (res.ok) {
      json = await res.json();
    }
  } catch (err) {
    // log and ignore
    // eslint-disable-next-line no-console
    console.log(`failed to fetch ${endpoint}`, err);
  }
  return json;
}
