import { HorizontalAlignment } from "../../src/style/HorizontalAlignment";
import { Style } from "../../src/style/Style";
import { Paragraph } from "../../src/text/Paragraph";
import { TextDocument } from "../../src/TextDocument";

describe(Paragraph.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#addParagraph", () => {
    it("add text namespace", () => {
      document.addParagraph();

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/);
    });

    it("insert an empty paragraph", () => {
      document.addParagraph();

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p\/>/);
    });

    it("insert a paragraph with specified text", () => {
      document.addParagraph("some text");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    });
  });

  describe("#addText", () => {
    it("set the text if element is empty", () => {
      const paragraph = document.addParagraph();
      paragraph.addText("some text");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    });

    it("append the text", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.addText(" some more text");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text some more text<\/text:p>/);
    });
  });

  describe("#getText", () => {
    it("return the text", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.addText(" some\nmore   text");
      paragraph.addHyperlink(" link", "http://example.org/");
      paragraph.addText(" even more text");

      expect(paragraph.getText()).toEqual("some text some\nmore   text link even more text");
    });
  });

  describe("#setText", () => {
    it("replace existing text with specified text", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.setText("some other text");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some other text<\/text:p>/);
    });
  });

  it("replace newline with line break", () => {
    document.addParagraph("some text\nsome more text");

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p>some text<text:line-break\/>some more text<\/text:p>/);
  });

  describe("#addHyperlink", () => {
    it("append a linked text", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.addHyperlink(" some linked text", "http://example.org/");

      const documentAsString = document.toString();
      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<text:p>some text<text:a xlink:type="simple" xlink:href="http:\/\/example.org\/"> some linked text<\/text:a><\/text:p>/);
    });

    it("not create a hyperlink if text is empty", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.addHyperlink("", "http://example.org/");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    });
  });

  describe("#setStyle", () => {
    let paragraph: Paragraph;
    let style: Style;

    beforeEach(() => {
      paragraph = document.addParagraph("some text");
      style = new Style();
    });

    it("set style-name attribute on paragraph if any style property was set", () => {
      style.setPageBreakBefore();
      paragraph.setStyle(style);

      expect(document.toString()).toMatch(/<text:p text:style-name="([a-z0-9]+)">some text<\/text:p>/);
    });

    it("not style-name attribute if style is not set", () => {
      paragraph.setStyle(undefined);

      expect(document.toString()).toMatch(/<text:p>some text<\/text:p>/);
    });

    it("not style-name attribute if default style is set", () => {
      paragraph.setStyle(new Style());

      expect(document.toString()).toMatch(/<text:p>some text<\/text:p>/);
    });
  });

  describe("#getStyle", () => {
    let paragraph: Paragraph;

    beforeEach(() => {
      paragraph = document.addParagraph("some text");
    });

    it("return undefined if no style was set", () => {
      expect(paragraph.getStyle()).toBeUndefined();
    });

    it("return previous set style", () => {
      const testStyle = new Style();
      testStyle.setHorizontalAlignment(HorizontalAlignment.Center);
      testStyle.setPageBreakBefore();

      paragraph.setStyle(testStyle);

      expect(paragraph.getStyle()).toBe(testStyle);
    });
  });
});
