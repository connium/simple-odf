import { Heading } from "../../src/text/Heading";
import { TextDocument } from "../../src/TextDocument";

describe(Heading.name, () => {
  let document: TextDocument;
  let heading: Heading;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#addHeading", () => {
    it("add text namespace", () => {
      document.addHeading();

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/);
    });

    it("insert an empty heading with default level 1", () => {
      document.addHeading();

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:h text:outline-level="1"\/>/);
    });

    it("insert a heading with given text and default level 1", () => {
      document.addHeading("heading");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:h text:outline-level="1">heading<\/text:h>/);
    });

    it("insert a heading with given text and given level", () => {
      document.addHeading("heading", 2);

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:h text:outline-level="2">heading<\/text:h>/);
    });
  });

  describe("#setLevel", () => {
    beforeEach(() => {
      heading = document.addHeading("Heading", 2);
    });

    it("change the current level to the given value", () => {
      heading.setLevel(3);
      const headingLevel = heading.getLevel();

      expect(headingLevel).toBe(3);
    });

    it("change the current level to the default value, if the given value is invalid", () => {
      heading.setLevel(-2);
      const headingLevel = heading.getLevel();

      expect(headingLevel).toBe(Heading.DEFAULT_LEVEL);
    });
  });

  describe("#getLevel", () => {
    beforeEach(() => {
      heading = document.addHeading("heading", 2);
    });

    it("return the current level", () => {
      const headingLevel = heading.getLevel();

      expect(headingLevel).toBe(2);
    });
  });
});
