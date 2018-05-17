import { Color } from "../../src/style/Color";
import { Style } from "../../src/style/Style";
import { TextStyle } from "../../src/style/TextStyle";
import { Typeface } from "../../src/style/Typeface";
import { Paragraph } from "../../src/text/Paragraph";
import { TextDocument } from "../../src/TextDocument";

describe(TextStyle.name, () => {
  let document: TextDocument;
  let paragraph: Paragraph;
  let testStyle: TextStyle;

  beforeEach(() => {
    document = new TextDocument();
    paragraph = document.addParagraph("test");
    testStyle = new TextStyle();
  });

  it("not set a style if it is default", () => {
    const testParagraph = new Style();
    testParagraph.setPageBreakBefore();
    paragraph.setStyle(testParagraph);
    paragraph.setTextStyle(testStyle);

    expect(document.toString()).not.toMatch(/<style:text-properties/);
  });

  describe("#setColor", () => {
    it("not set text-properties if color is default", () => {
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).not.toMatch(/fo:color/);
    });

    it("set the font size", () => {
      testStyle.setColor(Color.fromRgb(1, 2, 3));
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:color="#010203"\/>/);
    });
  });

  describe("#getColor", () => {
    it("return undefined if no color is set", () => {
      expect(testStyle.getColor()).toBeUndefined();
    });

    it("return the current color", () => {
      const testColor = Color.fromRgb(1, 2, 3);

      testStyle.setColor(testColor);

      expect(testStyle.getColor()).toBe(testColor);
    });
  });

  describe("#setFontSize", () => {
    it("not set text-properties if font size is default", () => {
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).not.toMatch(/fo:font-size/);
    });

    it("set the font size", () => {
      testStyle.setFontSize(23);
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-size="23pt"\/>/);
    });

    it("set a minimum font size", () => {
      testStyle.setFontSize(-42);

      expect(testStyle.getFontSize()).toBe(2);
    });
  });

  describe("#getFontSize", () => {
    it("return the current font size", () => {
      expect(testStyle.getFontSize()).toBe(12);

      testStyle.setFontSize(23);

      expect(testStyle.getFontSize()).toBe(23);
    });
  });

  describe("#setTypeface", () => {
    it("not set text-properties if typeface is default", () => {
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).not.toMatch(/fo:font-style/);
      expect(document.toString()).not.toMatch(/fo:font-weight/);
    });

    it("set the font-style for italic", () => {
      testStyle.setTypeface(Typeface.Italic);
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="italic"\/>/);
    });

    it("set the font-style for oblique", () => {
      testStyle.setTypeface(Typeface.Oblique);
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="oblique"\/>/);
    });

    it("set the font-weight for bold", () => {
      testStyle.setTypeface(Typeface.Bold);
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-weight="bold"\/>/);
    });

    it("set the font-style and font-weight for bold-italic", () => {
      testStyle.setTypeface(Typeface.BoldItalic);
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="italic" fo:font-weight="bold"\/>/);
    });

    it("set the font-style and font-weight for bold-oblique", () => {
      testStyle.setTypeface(Typeface.BoldOblique);
      paragraph.setTextStyle(testStyle);

      expect(document.toString()).toMatch(/<style:text-properties fo:font-style="oblique" fo:font-weight="bold"\/>/);
    });
  });

  describe("#getTypeface", () => {
    it("return the current typeface", () => {
      expect(testStyle.getTypeface()).toBe(Typeface.Normal);

      testStyle.setTypeface(Typeface.BoldItalic);

      expect(testStyle.getTypeface()).toBe(Typeface.BoldItalic);
    });
  });

  describe("#isDefault", () => {
    it("return true if the style equals the default style", () => {
      expect(testStyle.isDefault()).toBe(true);

      testStyle.setColor(undefined);
      testStyle.setFontSize(12);
      testStyle.setTypeface(Typeface.Normal);

      expect(testStyle.isDefault()).toBe(true);
    });

    it("return false if any property of the style differs from the default style", () => {
      testStyle.setTypeface(Typeface.BoldItalic);

      expect(testStyle.isDefault()).toBe(false);
    });
  });
});
