import { Color } from './Color';
import { FontVariant } from './FontVariant';
import { LineMode } from './LineMode';
import { LineStyle } from './LineStyle';
import { LineType } from './LineType';
import { LineWidth } from './LineWidth';
import { TextLine } from './TextLine';
import { TextProperties } from './TextProperties';
import { TextTransformation } from './TextTransformation';
import { Typeface } from './Typeface';

describe(TextProperties.name, () => {
  let properties: TextProperties;

  beforeEach(() => {
    properties = new TextProperties();
  });

  describe('background color', () => {
    it('return undefined by default', () => {
      expect(properties.getBackgroundColor()).toBeUndefined();
    });

    it('return previously set alignment', () => {
      const testColor = Color.fromRgb(1, 2, 3);

      properties.setBackgroundColor(testColor);

      expect(properties.getBackgroundColor()).toBe(testColor);
    });
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

  describe('font variant', () => {
    it('return Normal by default', () => {
      expect(properties.getFontVariant()).toBe(FontVariant.Normal);
    });

    it('return previously set font variant', () => {
      const testFontVariant = FontVariant.SmallCaps;

      properties.setFontVariant(testFontVariant);

      expect(properties.getFontVariant()).toBe(testFontVariant);
    });
  });

  describe('overline', () => {
    const testLineColor = Color.fromRgb(1, 2, 3);
    const testLineMode = LineMode.SkipWhiteSpace;
    const testLineStyle = LineStyle.Wave;
    const testLineType = LineType.Double;
    const testLineWidth = 13.37;
    const expectedLine: Readonly<TextLine> = {
      color: testLineColor,
      mode: testLineMode,
      style: testLineStyle,
      type: testLineType,
      width: testLineWidth,
    };

    it('return undefined by default', () => {
      // Assert
      expect(properties.getOverline()).toBeUndefined();
    });

    it('return line with defaults if no parameters are passed', () => {
      // Arrange
      const expectedDefaultLine: TextLine = {
        color: 'font-color',
        mode: LineMode.Continuous,
        style: LineStyle.Solid,
        type: LineType.Single,
        width: LineWidth.Auto,
      };

      // Act
      properties.setOverline();

      // Assert
      expect(properties.getOverline()).toEqual(expectedDefaultLine);
    });

    it('return previously set line', () => {
      // Act
      properties.setOverline(
        testLineColor,
        testLineWidth,
        testLineStyle,
        testLineType,
        testLineMode
      );

      // Assert
      expect(properties.getOverline()).toEqual(expectedLine);
    });

    it('ignore invalid value', () => {
      // Arrange
      properties.setOverline(
        testLineColor,
        testLineWidth,
        testLineStyle,
        testLineType,
        testLineMode
      );

      // Act
      properties.setOverline(testLineColor, -0.1);

      // Assert
      expect(properties.getOverline()).toEqual(expectedLine);
    });

    it('remove previously set border', () => {
      // Arrange
      properties.setOverline(
        testLineColor,
        testLineWidth,
        testLineStyle,
        testLineType,
        testLineMode
      );

      // Act
      properties.removeOverline();

      // Assert
      expect(properties.getOverline()).toBeUndefined();
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

  describe('underline', () => {
    const testLineColor = Color.fromRgb(1, 2, 3);
    const testLineMode = LineMode.SkipWhiteSpace;
    const testLineStyle = LineStyle.Wave;
    const testLineType = LineType.Double;
    const testLineWidth = 13.37;
    const expectedLine: Readonly<TextLine> = {
      color: testLineColor,
      mode: testLineMode,
      style: testLineStyle,
      type: testLineType,
      width: testLineWidth,
    };

    it('return undefined by default', () => {
      // Assert
      expect(properties.getUnderline()).toBeUndefined();
    });

    it('return line with defaults if no parameters are passed', () => {
      // Arrange
      const expectedDefaultLine: TextLine = {
        color: 'font-color',
        mode: LineMode.Continuous,
        style: LineStyle.Solid,
        type: LineType.Single,
        width: LineWidth.Auto,
      };

      // Act
      properties.setUnderline();

      // Assert
      expect(properties.getUnderline()).toEqual(expectedDefaultLine);
    });

    it('return previously set line', () => {
      // Act
      properties.setUnderline(
        testLineColor,
        testLineWidth,
        testLineStyle,
        testLineType,
        testLineMode
      );

      // Assert
      expect(properties.getUnderline()).toEqual(expectedLine);
    });

    it('ignore invalid value', () => {
      // Arrange
      properties.setUnderline(
        testLineColor,
        testLineWidth,
        testLineStyle,
        testLineType,
        testLineMode
      );

      // Act
      properties.setUnderline(testLineColor, -0.1);

      // Assert
      expect(properties.getUnderline()).toEqual(expectedLine);
    });

    it('remove previously set border', () => {
      // Arrange
      properties.setUnderline(
        testLineColor,
        testLineWidth,
        testLineStyle,
        testLineType,
        testLineMode
      );

      // Act
      properties.removeUnderline();

      // Assert
      expect(properties.getUnderline()).toBeUndefined();
    });
  });
});
