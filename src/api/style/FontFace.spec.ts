import { FontFace } from './FontFace';
import { FontFamilyGeneric } from './FontFamilyGeneric';
import { FontPitch } from './FontPitch';

describe(FontFace.name, () => {
  const testFamily = 'someFontFamily';
  const testFontPitch = FontPitch.Variable;
  const testName = 'someFontName';

  let fontFace: FontFace;

  beforeEach(() => {
    fontFace = new FontFace(testName, testFamily, testFontPitch);
  });

  describe('name', () => {
    it('return initial name', () => {
      expect(fontFace.getName()).toBe(testName);
    });
  });

  describe('font charset', () => {
    const testCharset = 'x-symbol';

    it('return undefined by default', () => {
      expect(fontFace.getCharset()).toBeUndefined();
    });

    it('return previous set charset', () => {
      fontFace.setCharset(testCharset);

      expect(fontFace.getCharset()).toBe(testCharset);
    });

    it('return undefined if undefined is set', () => {
      fontFace.setCharset(testCharset);
      fontFace.setCharset(undefined);

      expect(fontFace.getCharset()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      fontFace.setCharset(testCharset);
      fontFace.setCharset('2342');

      expect(fontFace.getCharset()).toBe(testCharset);
    });
  });

  describe('font family', () => {
    it('return initial font family', () => {
      expect(fontFace.getFontFamily()).toBe(testFamily);
    });

    it('return undefined if initial family is not set', () => {
      fontFace = new FontFace(testName);

      expect(fontFace.getFontFamily()).toBeUndefined();
    });

    it('return previous set charset', () => {
      const testFamily2 = 'someOtherFontFamily';

      fontFace.setFontFamily(testFamily2);

      expect(fontFace.getFontFamily()).toBe(testFamily2);
    });

    it('return undefined if undefined is set', () => {
      fontFace.setFontFamily(undefined);

      expect(fontFace.getFontFamily()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      fontFace.setFontFamily(null as any);

      expect(fontFace.getFontFamily()).toBe(testFamily);
    });
  });

  describe('font family generic', () => {
    const testFamilyGeneric = FontFamilyGeneric.System;

    it('return undefined by default', () => {
      expect(fontFace.getFontFamilyGeneric()).toBeUndefined();
    });

    it('return previous set font family generic', () => {
      fontFace.setFontFamilyGeneric(testFamilyGeneric);

      expect(fontFace.getFontFamilyGeneric()).toBe(testFamilyGeneric);
    });

    it('return undefined if undefined is set', () => {
      fontFace.setFontFamilyGeneric(testFamilyGeneric);
      fontFace.setFontFamilyGeneric(undefined);

      expect(fontFace.getFontFamilyGeneric()).toBeUndefined();
    });

    it('ignore invalid input', () => {
      fontFace.setFontFamilyGeneric(testFamilyGeneric);
      fontFace.setFontFamilyGeneric(null as any);

      expect(fontFace.getFontFamilyGeneric()).toBe(testFamilyGeneric);
    });
  });

  describe('font pitch', () => {
    it('return initial font pitch', () => {
      expect(fontFace.getFontPitch()).toBe(testFontPitch);
    });

    it('return undefined if initial family is not set', () => {
      fontFace = new FontFace(testName);

      expect(fontFace.getFontPitch()).toBeUndefined();
    });

    it('return previous set charset', () => {
      const testFontPitch2 = FontPitch.Fixed;

      fontFace.setFontPitch(testFontPitch2);

      expect(fontFace.getFontPitch()).toBe(testFontPitch2);
    });

    it('return undefined if undefined is set', () => {
      fontFace.setFontPitch(undefined);

      expect(fontFace.getFontPitch()).toBeUndefined();
    });
  });
});
