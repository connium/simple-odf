import { Color } from './Color';
import { TextProperties } from './TextProperties';
import { TextTransformation } from './TextTransformation';
import { Typeface } from './Typeface';

describe(TextProperties.name, () => {
  let properties: TextProperties;

  beforeEach(() => {
    properties = new TextProperties();
  });

  describe('color', () => {
    it('return undefined by default', () => {
      expect(properties.getColor()).toBeUndefined();
    });

    it('return previously set color', () => {
      const testColor = Color.fromRgb(1, 2, 3);

      properties.setColor(testColor);

      expect(properties.getColor()).toBe(testColor);
    });
  });

  describe('font name', () => {
    it('return undefined by default', () => {
      expect(properties.getFontName()).toBeUndefined();
    });

    it('return previously set font name', () => {
      const testFontName = 'someFont';

      properties.setFontName(testFontName);

      expect(properties.getFontName()).toBe(testFontName);
    });
  });

  describe('#font size', () => {
    const testFontSize = 23;

    it('return default font size', () => {
      expect(properties.getFontSize()).toBe(12);
    });

    it('return previously set font size', () => {
      properties.setFontSize(testFontSize);

      expect(properties.getFontSize()).toBe(testFontSize);
    });

    it('ignore invalid value', () => {
      properties.setFontSize(testFontSize);

      properties.setFontSize(-42);

      expect(properties.getFontSize()).toBe(testFontSize);
    });
  });

  describe('text transformation', () => {
    it('return `None` by default', () => {
      expect(properties.getTextTransformation()).toBe(TextTransformation.None);
    });

    it('return previously set text transformation', () => {
      const testTextTransformation = TextTransformation.Uppercase;

      properties.setTextTransformation(testTextTransformation);

      expect(properties.getTextTransformation()).toBe(testTextTransformation);
    });
  });

  describe('#getTypeface', () => {
    it('return `Normal` by default', () => {
      expect(properties.getTypeface()).toBe(Typeface.Normal);
    });

    it('return previously set typeface', () => {
      const testTypeface = Typeface.BoldItalic;

      properties.setTypeface(testTypeface);

      expect(properties.getTypeface()).toBe(testTypeface);
    });
  });
});
