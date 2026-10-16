// Pure helpers for Open Food Facts barcode lookups (browser-safe, no keys needed).
export type LookupResult = {name?: string | undefined; brand?: string | undefined; size?: string | undefined; image?: string | undefined};
export type LookupStatus = 'idle' | 'searching' | 'found' | 'not-found' | 'error';

export function normalizeBarcode(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function isValidBarcode(code: string): boolean {
  return /^\d{6,14}$/.test(code);
}

const clean = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);

export function parseOpenFoodFacts(json: unknown): LookupResult | null {
  const j = json as {status?: number; product?: Record<string, unknown>} | null;
  if (!j || j.status !== 1 || !j.product) return null;
  const p = j.product;
  const result: LookupResult = {
    name: clean(p['product_name_es']) ?? clean(p['product_name']),
    brand: clean(p['brands'])?.split(',')[0]?.trim(),
    size: clean(p['quantity']),
    image: clean(p['image_front_url']) ?? clean(p['image_url']),
  };
  return result.name || result.brand || result.image ? result : null;
}

export async function lookupBarcode(code: string, signal?: AbortSignal): Promise<LookupResult | null> {
  const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=product_name,product_name_es,brands,quantity,image_front_url,image_url`;
  const res = await fetch(url, {signal: signal ?? null, headers: {Accept: 'application/json'}});
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseOpenFoodFacts(await res.json());
}
