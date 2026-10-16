import {describe, it, expect} from 'vitest';
import {parseOpenFoodFacts, normalizeBarcode, isValidBarcode} from '@/features/kiosco/barcode';

describe('barcode helpers', () => {
  it('limpia el código leído', () => expect(normalizeBarcode(' 7790 895-000997\n')).toBe('7790895000997'));
  it('valida largo del código', () => { expect(isValidBarcode('12345')).toBe(false); expect(isValidBarcode('7790895000997')).toBe(true); });
  it('producto no encontrado devuelve null', () => expect(parseOpenFoodFacts({status: 0})).toBeNull());
  it('toma campos útiles sin precio', () => {
    const r = parseOpenFoodFacts({status: 1, product: {product_name: 'Coca-Cola', brands: 'Coca-Cola, KO', quantity: '500 ml'}});
    expect(r).toEqual({name: 'Coca-Cola', brand: 'Coca-Cola', size: '500 ml', image: undefined});
    expect(r).not.toHaveProperty('price');
  });
});
