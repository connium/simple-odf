import { readFile, unlink } from "fs";
import { promisify } from "util";
import { Meta } from "./api/meta/Meta";
import { FontPitch } from "./style/FontPitch";
import { Heading } from "./text/Heading";
import { List } from "./text/List";
import { Paragraph } from "./text/Paragraph";
import { TextDocument, XML_DECLARATION } from "./TextDocument";

const FILEPATH = "./test.fodt";

jest.mock("./xml/meta/MetaWriter");

describe(TextDocument.name, () => {
  /* tslint:disable-next-line:max-line-length */
  const baseDocument = '<office:document xmlns:dc="http://purl.org/dc/elements/1.1" xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0" xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:xlink="http://www.w3.org/1999/xlink" office:mimetype="application/vnd.oasis.opendocument.text" office:version="1.2" xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"><office:body><office:text/></office:body></office:document>';
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    await unlinkAsync(FILEPATH);

    done();
  });

  describe("namespace declaration", () => {
    it("add dc namespace", () => {
      expect(document.toString()).toMatch(/xmlns:dc="http:\/\/purl.org\/dc\/elements\/1.1"/);
    });

    it("add draw namespace", () => {
      expect(document.toString()).toMatch(/xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0"/);
    });

    it("add fo namespace", () => {
      expect(document.toString()).toMatch(/xmlns:fo="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0"/);
    });

    it("add meta namespace", () => {
      expect(document.toString()).toMatch(/xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0"/);
    });

    it("add style namespace", () => {
      expect(document.toString()).toMatch(/xmlns:style="urn:oasis:names:tc:opendocument:xmlns:style:1.0"/);
    });

    it("add svg namespace", () => {
      expect(document.toString()).toMatch(/xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"/);
    });

    it("add text namespace", () => {
      expect(document.toString()).toMatch(/xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0"/);
    });

    it("add xlink namespace", () => {
      expect(document.toString()).toMatch(/xmlns:xlink="http:\/\/www.w3.org\/1999\/xlink"/);
    });
  });

  describe("#getMeta", () => {
    it("return a meta object", () => {
      expect(document.getMeta()).toBeInstanceOf(Meta);
    });
  });

  describe("#declareFont", () => {
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
