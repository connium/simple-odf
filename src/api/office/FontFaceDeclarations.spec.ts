import { FontFace, FontPitch } from '../style';
import { FontFaceDeclarations } from './FontFaceDeclarations';

describe(FontFaceDeclarations.name, () => {
  const testFontFamily = 'someFontFamily';
  const testFontName = 'someFontName';
  const testFontPitch = FontPitch.Variable;

  let fontFaceDeclarations: FontFaceDeclarations;

  beforeEach(() => {
    fontFaceDeclarations = new FontFaceDeclarations();
  });

  describe('font face', () => {
    it('return an empty list by default', () => {
      const fonts = fontFaceDeclarations.getAll();

      expect(fonts).toEqual([]);
    });

    it('create and return new font', () => {
      const font = fontFaceDeclarations.create(testFontName, testFontFamily, testFontPitch);

      expect(font).toBeInstanceOf(FontFace);
      expect(font.getFontFamily()).toBe(testFontFamily);
      expect(font.getFontPitch()).toBe(testFontPitch);
      expect(font.getName()).toBe(testFontName);
    });

    it('create a font only once', () => {
      const font1 = fontFaceDeclarations.create(testFontName);
      const font2 = fontFaceDeclarations.create(testFontName);
      const fonts = fontFaceDeclarations.getAll();

      expect(font1).toBe(font2);
      expect(fonts.length).toBe(1);
      expect(fonts[0]).toBe(font1);
    });

    it('get previously created font', () => {
      const font1 = fontFaceDeclarations.create(testFontName);
      const font2 = fontFaceDeclarations.get(testFontName);

      expect(font1).toBe(font2);
    });

    it('return undefined if unknown font is requested', () => {
      fontFaceDeclarations.create(testFontName);

      const font = fontFaceDeclarations.get('unknownFontName');

      expect(font).toBeUndefined();
    });

    it('delete font', () => {
      fontFaceDeclarations.create(testFontName);
      expect(fontFaceDeclarations.getAll().length).toBe(1);

      fontFaceDeclarations.delete(testFontName);
      expect(fontFaceDeclarations.getAll().length).toBe(0);
    });
  });
});
