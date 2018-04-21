import { Hyperlink } from "../../src/text/HyperLink";
import { TextDocument } from "../../src/TextDocument";

describe(Hyperlink.name, () => {
  const testText = "some text";
  const testUri = "http://example.org/";

  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#addHyperlink", () => {
    it("add xlink namespace", () => {
      document.addParagraph().addHyperlink("some linked text", testUri);

      expect(document.toString()).toMatch(/xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink"/);
    });

    it("append a linked text", () => {
      document.addParagraph(testText).addHyperlink(" some linked text", testUri);

      const documentAsString = document.toString();
      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<text:p>some text<text:a xlink:type="simple" xlink:href="http:\/\/example.org\/"> some linked text<\/text:a><\/text:p>/);
    });

    it("not create a hyperlink if text is empty", () => {
      document.addParagraph(testText).addHyperlink("", testUri);

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    });

    it("not create a hyperlink but add the text if URI is empty", () => {
      document.addParagraph(testText).addHyperlink(" some linked text", undefined);

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text some linked text<\/text:p>/);
    });
  });

  describe("#setURI", () => {
    let hyperlink: Hyperlink;

    beforeEach(() => {
      hyperlink = document.addParagraph().addHyperlink(testText, testUri);
    });

    it("change the current URI to the given value", () => {
      hyperlink.setURI("localhost");

      expect(hyperlink.getURI()).toBe("localhost");
    });
  });

  describe("#getURI", () => {
    let hyperlink: Hyperlink;

    beforeEach(() => {
      hyperlink = document.addParagraph().addHyperlink(testText, testUri);
    });

    it("return the current URI", () => {
      expect(hyperlink.getURI()).toBe(testUri);
    });
  });
});
