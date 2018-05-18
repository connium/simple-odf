import { Color } from "../../src/style/Color";
import { ParagraphStyle } from "../../src/style/ParagraphStyle";
import { TextProperties } from "../../src/style/TextProperties";
import { Typeface } from "../../src/style/Typeface";
import { Paragraph } from "../../src/text/Paragraph";
import { TextDocument } from "../../src/TextDocument";

describe(TextProperties.name, () => {
  let properties: TextProperties;
  let document: TextDocument;
  let paragraph: Paragraph;
  let testStyle: ParagraphStyle;

  beforeEach(() => {
    properties = new TextProperties();

    document = new TextDocument();
    paragraph = document.addParagraph("test");
    testStyle = new ParagraphStyle();
  });

  describe("#getColor", () => {
    it("return `undefined` as default", () => {
      expect(properties.getColor()).toBeUndefined();
    });

    it("return the current color", () => {
      const testColor = Color.fromRgb(1, 2, 3);

      properties.setColor(testColor);

      expect(properties.getColor()).toBe(testColor);
    });
  });

  describe("#setFontSize", () => {
    it("set a minimum font size", () => {
      properties.setFontSize(-42);

      expect(properties.getFontSize()).toBe(2);
    });
  });

  describe("#getFontSize", () => {
    it("return the current font size", () => {
      expect(properties.getFontSize()).toBe(12);

      properties.setFontSize(23);

      expect(properties.getFontSize()).toBe(23);
    });
  });

  describe("#getTypeface", () => {
    it("return the current typeface", () => {
      expect(properties.getTypeface()).toBe(Typeface.Normal);

      properties.setTypeface(Typeface.BoldItalic);

      expect(properties.getTypeface()).toBe(Typeface.BoldItalic);
    });
  });

  describe("#isDefault", () => {
    it("return true if no property was set", () => {
      expect(properties.isDefault()).toBe(true);
    });

    it("return false if color was set", () => {
      properties.setColor(Color.fromRgb(1, 2, 3));

      expect(properties.isDefault()).toBe(false);
    });

    it("return false if font size was set", () => {
      properties.setFontSize(23);

      expect(properties.isDefault()).toBe(false);
    });

    it("return false if typeface was set", () => {
      properties.setTypeface(Typeface.BoldItalic);

      expect(properties.isDefault()).toBe(false);
    });
  });

  describe("#toXml", () => {
    it("not add text properties if no property was set", () => {
      testStyle.setPageBreakBefore();
      paragraph.setStyle(testStyle);

      expect(document.toString()).not.toMatch(/<style:text-properties/);
    });

    it("set the color", () => {
      testStyle.setColor(Color.fromRgb(1, 2, 3));
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:color="#010203"\/>/);
    });

    it("set the font size", () => {
      testStyle.setFontSize(23);
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-size="23pt"\/>/);
    });

    it("set the font-style for italic", () => {
      testStyle.setTypeface(Typeface.Italic);
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="italic"\/>/);
    });

    it("set the font-style for oblique", () => {
      testStyle.setTypeface(Typeface.Oblique);
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="oblique"\/>/);
    });

    it("set the font-weight for bold", () => {
      testStyle.setTypeface(Typeface.Bold);
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-weight="bold"\/>/);
    });

    it("set the font-style and font-weight for bold-italic", () => {
      testStyle.setTypeface(Typeface.BoldItalic);
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="italic" fo:font-weight="bold"\/>/);
    });

    it("set the font-style and font-weight for bold-oblique", () => {
      testStyle.setTypeface(Typeface.BoldOblique);
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="oblique" fo:font-weight="bold"\/>/);
    });
  });
});
