import {createServerFn} from '@tanstack/react-start';
import {isValidBarcode, normalizeBarcode, parseEzCatalog, type LookupResult} from '@/features/kiosco/barcode';

const BASE = 'https://api.ez-catalog.huggian.com';
export type EzLookup = {status: 'found'; product: LookupResult} | {status: 'not-found' | 'error' | 'not-configured' | 'unauthorized' | 'rate-limited'};

let categoryCache: Map<string, string> | null = null;

async function categoryName(id: unknown, key: string): Promise<string | undefined> {
  if (typeof id !== 'string' || !id) return undefined;
  try {
    if (!categoryCache) {
      const res = await fetch(`${BASE}/v1/categories`, {headers: {'X-Api-Key': key, Accept: 'application/json'}});
      if (!res.ok) return undefined;
      const list = (await res.json()) as {id?: string; name?: string}[];
      categoryCache = new Map(Array.isArray(list) ? list.filter(c => c.id && c.name).map(c => [c.id!, c.name!]) : []);
    }
    return categoryCache.get(id);
  } catch { return undefined; }
}

export const lookupEzCatalog = createServerFn({method: 'POST'})
  .inputValidator((d: {code: string}) => {
    const code = normalizeBarcode(String(d?.code ?? ''));
    if (!isValidBarcode(code)) throw new Error('Código inválido');
    return {code};
  })
  .handler(async ({data}): Promise<EzLookup> => {
    const key = process.env['EZ_CATALOG_API_KEY'];
    if (!key) return {status: 'not-configured'};
    try {
      const res = await fetch(`${BASE}/v1/products/barcode/${encodeURIComponent(data.code)}`, {headers: {'X-Api-Key': key, Accept: 'application/json'}});
      if (res.status === 404) return {status: 'not-found'};
      if (res.status === 401 || res.status === 403) return {status: 'unauthorized'};
      if (res.status === 429) return {status: 'rate-limited'};
      if (!res.ok) { console.error('ez-catalog', res.status); return {status: 'error'}; }
      const json = (await res.json()) as Record<string, unknown>;
      const product = parseEzCatalog(json, await categoryName(json['category_id'], key));
      return product ? {status: 'found', product} : {status: 'not-found'};
    } catch (e) {
      console.error('ez-catalog fetch failed', e);
      return {status: 'error'};
    }
  });
