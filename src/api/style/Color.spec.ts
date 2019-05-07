import { Color } from './Color';

describe(Color.name, () => {
  const expectedHex = '336699';

  describe('#fromHex', () => {
    it('return color instance', () => {
      let color = Color.fromHex(expectedHex);

      expect(color).toBeInstanceOf(Color);
      expect(color.toHex()).toEqual('#' + expectedHex);

      color = Color.fromHex('#' + expectedHex);

      expect(color).toBeInstanceOf(Color);
      expect(color.toHex()).toEqual('#' + expectedHex);
    });

    it('throw if string is too long', () => {
      expect(() => Color.fromHex('123456789')).toThrow('color value');
    });

    it('return undefined if string is too short', () => {
      expect(() => Color.fromHex('1234')).toThrowError('color value');
    });

    it('return undefined if string contains non-hex characters', () => {
      expect(() => Color.fromHex('23fx42')).toThrowError('color value');
    });
  });

  describe('#fromRgb', () => {
    it('return color instance', () => {
      const color = Color.fromRgb(0x33, 0x66, 0x99);

      expect(color).toBeInstanceOf(Color);
      expect(color.toHex()).toEqual('#' + expectedHex);
    });

    it('return undefined if red is out of range', () => {
      expect(() => Color.fromRgb(-1, 0x66, 0x99)).toThrowError('color channel');

      expect(() => Color.fromRgb(256, 0x66, 0x99)).toThrowError('color channel');
    });

    it('return undefined if green is out of range', () => {
      expect(() => Color.fromRgb(0x33, -1, 0x99)).toThrowError('color channel');

      expect(() => Color.fromRgb(0x33, 256, 0x99)).toThrowError('color channel');
    });

    it('return undefined if blue is out of range', () => {
      expect(() => Color.fromRgb(0x33, 0x66, -1)).toThrowError('color channel');

      expect(() => Color.fromRgb(0x33, 0x66, 256)).toThrowError('color channel');
    });
  });

  describe('#toHex', () => {
    it('return hex code with leading #', () => {
      const color = Color.fromRgb(0x33, 0x66, 0x99);

      expect(color.toHex()).toEqual('#' + expectedHex);
    });

    it('return hex code with padded 0', () => {
      const color = Color.fromRgb(0x3, 0x6, 0x9);

      expect(color.toHex()).toEqual('#030609');
    });
  });
});
