// Pure helpers for ez-catalog (Huggian) barcode lookups. The real request runs on the server (ez-catalog.functions.ts) so the API key never reaches the browser.
export type LookupResult = {name?: string | undefined; brand?: string | undefined; size?: string | undefined; category?: string | undefined};
export type LookupStatus = 'idle' | 'searching' | 'found' | 'not-found' | 'error' | 'not-configured' | 'unauthorized' | 'rate-limited';

export function normalizeBarcode(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function isValidBarcode(code: string): boolean {
  return /^\d{6,14}$/.test(code);
}

const clean = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);

/** Maps a documented ez-catalog Product to form fields. Never takes price or image. */
export function parseEzCatalog(json: unknown, categoryName?: string): LookupResult | null {
  const p = json as Record<string, unknown> | null;
  if (!p || typeof p !== 'object') return null;
  const result: LookupResult = {
    name: clean(p['name']),
    brand: clean(p['brand']),
    size: clean(p['presentation']),
    category: clean(categoryName) ?? clean(p['subcategory']),
  };
  return result.name || result.brand ? result : null;
}

const rules: [RegExp, string][] = [
  [/bebida|gaseosa|agua|jugo|cerveza|vino|energ/i, 'Bebidas'],
  [/golosina|caramelo|chocolate|alfajor|chicle|confite/i, 'Golosinas'],
  [/galletit|galleta/i, 'Galletitas'],
  [/snack|papas|chizito|mani/i, 'Snacks'],
  [/limpieza|detergente|lavandina|desinfect/i, 'Limpieza'],
  [/higiene|perfumer|cuidado personal|shampoo|jab[oó]n|dental/i, 'Higiene personal'],
  [/librer|papeler|escolar/i, 'Librería'],
  [/almac|aliment|yerba|caf|az[uú]car|harina|fideo|arroz|aceite|l[aá]cteo|conserva/i, 'Almacén'],
];

/** Picks the matching Kiosco Ya category for an ez-catalog category name, if any. */
export function matchCategory(name: string | undefined, available: readonly string[]): string | undefined {
  if (!name) return undefined;
  const direct = available.find(c => c.toLowerCase() === name.toLowerCase());
  if (direct) return direct;
  const hit = rules.find(([re]) => re.test(name))?.[1];
  return hit && available.includes(hit) ? hit : undefined;
}
