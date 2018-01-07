import { Headline } from "../../src/text/Headline";
import { TextDocument } from "../../src/TextDocument";

describe(Headline.name, () => {
  let document: TextDocument;
  let headline: Headline;

  beforeEach(() => {
    document = new TextDocument();
  });

  it("insert an empty headline with default level 1", () => {
    document.addHeadline();

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:h text:outline-level="1"\/>/);
    expect(documentAsString).not.toMatch(/xmlns:text/);
  });

  it("insert a headline with given text and default level 1", () => {
    document.addHeadline("heading");

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:h text:outline-level="1">heading<\/text:h>/);
    expect(documentAsString).toMatch(/xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/);
  });

  it("insert a headline with given text and given level", () => {
    document.addHeadline("heading", 2);

    const documentAsString = document.toString();
    expect(documentAsString).toMatch(/<text:h text:outline-level="2">heading<\/text:h>/);
  });

  describe("#setHeadingLevel", () => {
    beforeEach(() => {
      headline = document.addHeadline("Heading", 2);
    });

    it("change the current level to the given value", () => {
      headline.setHeadingLevel(3);
      const headingLevel = headline.getHeadingLevel();

      expect(headingLevel).toBe(3);
    });

    it("change the current level to the default value, if the given value is invalid", () => {
      headline.setHeadingLevel(-2);
      const headingLevel = headline.getHeadingLevel();

      expect(headingLevel).toBe(Headline.DEFAULT_LEVEL);
    });
  });

  describe("#getHeadingLevel", () => {
    beforeEach(() => {
      headline = document.addHeadline("heading", 2);
    });

    it("return the current level", () => {
      const headingLevel = headline.getHeadingLevel();

      expect(headingLevel).toBe(2);
    });
  });
});
