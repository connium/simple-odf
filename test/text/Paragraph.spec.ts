import { join } from "path";
import { HorizontalAlignment } from "../../src/style/HorizontalAlignment";
import { Paragraph } from "../../src/text/Paragraph";
import { TextDocument } from "../../src/TextDocument";

describe(Paragraph.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

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

  it("return the text", () => {
    const paragraph = document.addParagraph("some text");
    paragraph.appendText(" some\nmore   text");
    paragraph.appendHyperlink(" link", "http://example.org/");
    paragraph.appendText(" even more text");

    expect(paragraph.getText()).toEqual("some text some\nmore   text link even more text");
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

  it("remove text from paragraph", () => {
    const paragraph = document.addParagraph("some text");
    paragraph.removeText();

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p\/>/);
  });

  it("replace newline with line break", () => {
    document.addParagraph("some text\nsome more text");

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:p>some text<text:line-break\/>some more text<\/text:p>/);
  });

  describe("#appendHyperlink", () => {
    it("add xlink namespace", () => {
      const paragraph = document.addParagraph();
      paragraph.appendHyperlink("some linked text", "http://example.org/");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink"/);
    });

    it("append a linked text", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.appendHyperlink(" some linked text", "http://example.org/");

      const documentAsString = document.toString();
      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<text:p>some text<text:a xlink:type="simple" xlink:href="http:\/\/example.org\/"> some linked text<\/text:a><\/text:p>/);
    });

    it("not create a hyperlink if text is empty", () => {
      const paragraph = document.addParagraph("some text");
      paragraph.appendHyperlink("", "http://example.org/");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    });
  });

  describe("#appendImage", () => {
    let documentAsString: string;

    beforeEach(() => {
      const paragraph = document.addParagraph();
      paragraph.appendImage(join(__dirname, "..", "data", "image.png"));

      documentAsString = document.toString();
    });

    it("add draw namespace", () => {
      expect(documentAsString).toMatch(/xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"/);
    });

    it("append a draw frame with image and base64 encoded image", () => {
      const regex = new RegExp("<draw:frame text:anchor-type=\"paragraph\">"
        + "<draw:image>"
        + "<office:binary-data>"
        + ".*"
        + "</office:binary-data>"
        + "</draw:image>"
        + "</draw:frame>");
      expect(documentAsString).toMatch(regex);
    });
  });

  describe("style", () => {
    let paragraph: Paragraph;

    beforeEach(() => {
      paragraph = document.addParagraph("some text");
    });

    it("set style-name attribute on paragraph if any style property was set", () => {
      paragraph.setPageBreak();

      expect(document.toString()).toMatch(/<text:p text:style-name="([a-z0-9]+)">some text<\/text:p>/);
    });

    it("set the page break property to the paragraph style", () => {
      paragraph.setPageBreak();

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties fo:break-before="page"\/><\/style:style>/);
    });

    it("get the current horizontal alignment and not set a style if it is default", () => {
      const alignment = paragraph.getHorizontalAlignment();

      expect(alignment).toBe(HorizontalAlignment.Default);
      expect(document.toString()).not.toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)">/);
    });

    it("set the horizontal alignment", () => {
      const testAlignment = HorizontalAlignment.Center;

      paragraph.setHorizontalAlignment(testAlignment);

      expect(paragraph.getHorizontalAlignment()).toBe(testAlignment);
      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties fo:text-align="center"\/><\/style:style>/);
    });
  });
});
