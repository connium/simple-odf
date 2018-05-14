import { join } from "path";
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

      expect(document.toString()).toMatch(/xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/);
    });

    it("insert an empty paragraph", () => {
      document.addParagraph();

      expect(document.toString()).toMatch(/<text:p\/>/);
    });

    it("insert a paragraph with specified text", () => {
      document.addParagraph("some text");

      expect(document.toString()).toMatch(/<text:p>some text<\/text:p>/);
    });
  });

  describe("#addText", () => {
    it("set the text if element is empty", () => {
      document.addParagraph().addText("some text");

      expect(document.toString()).toMatch(/<text:p>some text<\/text:p>/);
    });

    it("append the text", () => {
      document.addParagraph("some text").addText(" some more text");

      expect(document.toString()).toMatch(/<text:p>some text some more text<\/text:p>/);
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
      document.addParagraph("some text").setText("some other text");

      expect(document.toString()).toMatch(/<text:p>some other text<\/text:p>/);
    });
  });

  it("replace newline with line break", () => {
    document.addParagraph("some text\nsome more text");

    expect(document.toString()).toMatch(/<text:p>some text<text:line-break\/>some more text<\/text:p>/);
  });

  it("replace tab with tabulation", () => {
    document.addParagraph("some\ttabbed\t\ttext");

    expect(document.toString()).toMatch(/<text:p>some<text:tab\/>tabbed<text:tab\/><text:tab\/>text<\/text:p>/);
  });

  it("replace sequence of spaces with space node", () => {
    document.addParagraph(" some  spacey   text    ");

    /* tslint:disable-next-line:max-line-length */
    expect(document.toString()).toMatch(/<text:p> some <text:s\/>spacey <text:s c="2"\/>text <text:s c="3"\/><\/text:p>/);
  });

  it("ignore carriage return character", () => {
    document.addParagraph("some text\r\nsome\r more text");

    expect(document.toString()).toMatch(/<text:p>some text<text:line-break\/>some more text<\/text:p>/);
  });

  describe("#addHyperlink", () => {
    it("append a linked text", () => {
      document.addParagraph("some text").addHyperlink(" some linked text", "http://example.org/");

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<text:p>some text<text:a xlink:type="simple" xlink:href="http:\/\/example.org\/"> some linked text<\/text:a><\/text:p>/);
    });
  });

  describe("#addImage", () => {
    it("append a draw frame with image and binary data", () => {
      document.addParagraph().addImage(join(__dirname, "..", "data", "ODF.png"));

      const regex = new RegExp("<draw:frame text:anchor-type=\"paragraph\">"
        + "<draw:image>"
        + "<office:binary-data>"
        + ".*"
        + "</office:binary-data>"
        + "</draw:image>"
        + "</draw:frame>");
      expect(document.toString()).toMatch(regex);
    });
  });

  describe("#setStyle", () => {
    let paragraph: Paragraph;
    let testStyle: Style;

    beforeEach(() => {
      paragraph = document.addParagraph("some text");
      testStyle = new Style();
    });

    it("set style-name attribute on paragraph if any style property was set", () => {
      testStyle.setPageBreakBefore();
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<text:p text:style-name="([a-z0-9]+)">some text<\/text:p>/);
    });

    it("not style-name attribute if default style is set", () => {
      paragraph.setStyle(testStyle);

      expect(document.toString()).toMatch(/<text:p>some text<\/text:p>/);
    });
  });

  describe("#getStyle", () => {
    let paragraph: Paragraph;

    beforeEach(() => {
      paragraph = document.addParagraph("some text");
    });

    it("return default style", () => {
      const style = paragraph.getStyle();

      expect(style).toBeDefined();
      expect(style.isDefault()).toBe(true);
    });

    it("return previous set style", () => {
      const testStyle = new Style();
      testStyle.setPageBreakBefore();

      paragraph.setStyle(testStyle);

      expect(paragraph.getStyle()).toBe(testStyle);
    });
  });
});
