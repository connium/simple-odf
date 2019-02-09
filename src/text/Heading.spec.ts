import { TextDocument } from "../TextDocument";
import { Heading } from "./Heading";

describe(Heading.name, () => {
  let document: TextDocument;
  let heading: Heading;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#addHeading", () => {
    it("insert an empty heading with default level 1", () => {
      document.getBody().addHeading();

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:h text:outline-level="1"\/>/);
    });

    it("insert a heading with given text and default level 1", () => {
      document.getBody().addHeading("heading");

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:h text:outline-level="1">heading<\/text:h>/);
    });

    it("insert a heading with given text and given level", () => {
      document.getBody().addHeading("heading", 2);

      const documentAsString = document.toString();
      expect(documentAsString).toMatch(/<text:h text:outline-level="2">heading<\/text:h>/);
    });
  });

  describe("#setLevel", () => {
    beforeEach(() => {
      heading = document.getBody().addHeading("Heading", 2);
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
      heading = document.getBody().addHeading("heading", 2);
    });

    it("return the current level", () => {
      const headingLevel = heading.getLevel();

      expect(headingLevel).toBe(2);
    });
  });
});
