import {describe, it, expect} from 'vitest';
import {parseEzCatalog, normalizeBarcode, isValidBarcode, matchCategory} from '@/features/kiosco/barcode';

describe('barcode helpers', () => {
  it('limpia el código leído', () => expect(normalizeBarcode(' 7790 895-000997\n')).toBe('7790895000997'));
  it('valida largo del código', () => { expect(isValidBarcode('12345')).toBe(false); expect(isValidBarcode('7790895000997')).toBe(true); });
  it('respuesta vacía devuelve null', () => expect(parseEzCatalog({})).toBeNull());
  it('toma nombre, marca y presentación sin precio ni imagen', () => {
    const r = parseEzCatalog({name: 'Yerba Mate Taragüi 500g', brand: 'Taragüi', presentation: '500g', image_url: 'https://images.huggian.com/x.jpg'}, 'Almacén');
    expect(r).toEqual({name: 'Yerba Mate Taragüi 500g', brand: 'Taragüi', size: '500g', category: 'Almacén'});
    expect(r).not.toHaveProperty('image');
    expect(r).not.toHaveProperty('price');
  });
  it('asocia categorías conocidas', () => {
    const cats = ['Bebidas', 'Almacén', 'Higiene personal'];
    expect(matchCategory('Gaseosas', cats)).toBe('Bebidas');
    expect(matchCategory('Cuidado personal', cats)).toBe('Higiene personal');
    expect(matchCategory('Ferretería', cats)).toBeUndefined();
  });
});
