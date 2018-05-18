import { readFile, unlink } from "fs";
import { promisify } from "util";
import { FontPitch } from "../src/style/FontPitch";
import { HorizontalAlignment } from "../src/style/HorizontalAlignment";
import { Heading } from "../src/text/Heading";
import { List } from "../src/text/List";
import { Paragraph } from "../src/text/Paragraph";
import { TextDocument, XML_DECLARATION } from "../src/TextDocument";

const FILEPATH = "./test.fodt";

describe(TextDocument.name, () => {
  /* tslint:disable-next-line:max-line-length */
  const baseDocument = '<office:document office:mimetype="application/vnd.oasis.opendocument.text" office:version="1.2" xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"><office:body><office:text/></office:body></office:document>';
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    await unlinkAsync(FILEPATH);

    done();
  });

  describe("#declareFont", () => {
    it("add svg namespace", () => {
      document.declareFont("Springfield", "Springfield", FontPitch.Variable);

      expect(document.toString()).toMatch(/xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"/);
    });

    it("add font declaration to document", () => {
      document.declareFont("Springfield", "Springfield", FontPitch.Variable);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<office:font-face-decls><style:font-face style:name="Springfield" svg:font-family="Springfield" style:font-pitch="variable"\/><\/office:font-face-decls>/);
    });

    it("add font declaration to document and wrap font family if it contains spaces", () => {
      document.declareFont("Homer Simpson", "Homer Simpson", FontPitch.Variable);

      /* tslint:disable-next-line:max-line-length */
      expect(document.toString()).toMatch(/<office:font-face-decls><style:font-face style:name="Homer Simpson" svg:font-family="'Homer Simpson'" style:font-pitch="variable"\/><\/office:font-face-decls>/);
    });
  });

  describe("#addHeading", () => {
    it("return a heading", () => {
      const heading = document.addHeading();

      expect(heading).toBeInstanceOf(Heading);
    });

    it("add heading to document", () => {
      document.addHeading();

      expect(document.toString()).toMatch(/<text:h/);
    });
  });

  describe("#addList", () => {
    it("return a list", () => {
      const list = document.addList();

      expect(list).toBeInstanceOf(List);
    });

    it("add list to document", () => {
      document.addList().addItem();

      expect(document.toString()).toMatch(/<text:list>/);
    });
  });

  describe("#addParagraph", () => {
    it("return a paragraph", () => {
      const paragraph = document.addParagraph();

      expect(paragraph).toBeInstanceOf(Paragraph);
    });

    it("add paragraph to document", () => {
      document.addParagraph();

      expect(document.toString()).toMatch(/<text:p/);
    });
  });

  describe("#saveFlat", () => {
    it("write a flat document", async (done) => {
      const readFileAsync = promisify(readFile);

      await document.saveFlat(FILEPATH);

      const fileContents = await readFileAsync(FILEPATH, "utf8");

      expect(fileContents).toEqual(XML_DECLARATION + baseDocument);
      done();
    });
  });

  describe("#toString", () => {
    it("return the basis document", () => {
      const result = document.toString();

      expect(result).toEqual(XML_DECLARATION + baseDocument);
    });
  });
});
