import { Paragraph } from "../../src/text/Paragraph";
import { TextDocument } from "../../src/TextDocument";

describe(Paragraph.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  it("insert an empty paragraph", () => {
    document.addParagraph();

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p\/>/);
    expect(documentAsString).not.toMatch(/xmlns:text/);
  });

  it("insert a paragraph with specified text and add text namespace", () => {
    document.addParagraph("some text");

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    expect(documentAsString).toMatch(/xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/);
  });

  it("return the text", () => {
    const paragraph = document.addParagraph("some text");

    expect(paragraph.getText()).toEqual("some text");
  });

  describe("#appendText", () => {
    it("set the text if element is empty", () => {
      const paragraph = document.addParagraph();
      paragraph.appendText("some text");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    });

    it("append the text", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.appendText(" some more text");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text some more text<\/text:p>/);
    });
  });

  it("replace existing text with specified text", () => {
    const paragraph = document.addParagraph("some text");
    paragraph.setText("some other text");

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p>some other text<\/text:p>/);
  });

  it("remove text from paragraph and not add text namespace", () => {
    const paragraph = document.addParagraph("some text");
    paragraph.removeText();

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p\/>/);
    expect(documentAsString).not.toMatch(/xmlns:text/);
  });

  it("replace newline with line break", () => {
    document.addParagraph("some text\nsome more text");

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p>some text<text:line-break\/>some more text<\/text:p>/);
  });

  describe("style", () => {
    let paragraph: Paragraph;

    beforeEach(() => {
      paragraph = document.addParagraph("some text");
    });

    it("set style-name attribute on paragraph if any style property was set", () => {
      paragraph.setPageBreak();

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p text:style-name="([a-z0-9]+)">some text<\/text:p>/);
    });

    // TODO page break
    // TODO get/set horizontal alignment
  });
});
