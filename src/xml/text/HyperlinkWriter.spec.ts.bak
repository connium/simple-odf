import { TextDocument } from "../../TextDocument";
import { HyperlinkWriter } from "./HyperlinkWriter";

describe(HyperlinkWriter.name, () => {
  const testText = "some text";
  const testUri = "http://example.org/";

  describe("#write", () => {
    let document: TextDocument;

    beforeEach(() => {
      document = new TextDocument();
    });

    it("append a linked text", () => {
      document.getBody().addParagraph(testText).addHyperlink(" some linked text", testUri);

      const documentAsString = document.toString();
      /* tslint:disable-next-line:max-line-length */
      expect(documentAsString).toMatch(/<text:p>some text<text:a xlink:type="simple" xlink:href="http:\/\/example.org\/"> some linked text<\/text:a><\/text:p>/);
    });

    it("not create a hyperlink if text is empty", () => {
      document.getBody().addParagraph(testText).addHyperlink("", testUri);

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:p>some text<\/text:p>/);
    });
  });
});
