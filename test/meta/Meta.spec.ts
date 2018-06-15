import { userInfo } from "os";
import { Meta } from "../../src/meta/Meta";
import { TextDocument } from "../../src/TextDocument";

describe(Meta.name, () => {
  let meta: Meta;

  beforeEach(() => {
    meta = new Meta();
  });

  describe("#setCreator", () => {
    it("return current username by default", () => {
      expect(meta.getCreator()).toBe(userInfo().username);
    });

    it("return previous set name", () => {
      const testCreator = "Home Simpson";

      meta.setCreator(testCreator);

      expect(meta.getCreator()).toBe(testCreator);
    });

    it("return current username if an empty name is set", () => {
      meta.setCreator("Home Simpson");
      meta.setCreator("");

      expect(meta.getCreator()).toBe(userInfo().username);
    });
  });

  describe("#setDescription", () => {
    it("return undefined by default", () => {
      expect(meta.getDescription()).toBeUndefined();
    });

    it("return previous set description", () => {
      const testDescription = "some test description";

      meta.setDescription(testDescription);

      expect(meta.getDescription()).toBe(testDescription);
    });
  });

  describe("#setLanguage", () => {
    it("return undefined by default", () => {
      expect(meta.getLanguage()).toBeUndefined();
    });

    it("return previous set language", () => {
      const testLanguage = "zu";

      meta.setLanguage(testLanguage);

      expect(meta.getLanguage()).toBe(testLanguage);
    });

    it("ignore value if an invalid language is given", () => {
      const testLanguage = "zu";

      meta.setLanguage(testLanguage);
      meta.setLanguage("invalid");

      expect(meta.getLanguage()).toBe(testLanguage);
    });
  });

  describe("#setSubject", () => {
    it("return undefined by default", () => {
      expect(meta.getSubject()).toBeUndefined();
    });

    it("return previous set subject", () => {
      const testSubject = "some test subject";

      meta.setSubject(testSubject);

      expect(meta.getSubject()).toBe(testSubject);
    });
  });

  describe("#setTitle", () => {
    it("return undefined by default", () => {
      expect(meta.getTitle()).toBeUndefined();
    });

    it("return previous set title", () => {
      const testTitle = "some test title";

      meta.setTitle(testTitle);

      expect(meta.getTitle()).toBe(testTitle);
    });
  });

  describe("#toXml", () => {
    let document: TextDocument;

    beforeEach(() => {
      document = new TextDocument();
    });

    it("append creator, date, creation-date, editing-cycles and generator as default properties", () => {
      const regex = new RegExp("<office:meta>"
        + "<dc:creator>" + userInfo().username + "</dc:creator>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });

    it("ignore description, language, subject, title if they are empty", () => {
      document.getMeta().setDescription("");
      document.getMeta().setLanguage("");
      document.getMeta().setSubject("");
      document.getMeta().setTitle("");

      const regex = new RegExp("<office:meta>"
        + "<dc:creator>" + userInfo().username + "</dc:creator>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });

    it("append description, language, subject, title if they are set", () => {
      document.getMeta().setCreator("Homer Simpson");
      document.getMeta().setDescription("some test description");
      document.getMeta().setLanguage("zu");
      document.getMeta().setSubject("some test subject");
      document.getMeta().setTitle("some test title");

      const regex = new RegExp("<office:meta>"
        + "<dc:creator>Homer Simpson</dc:creator>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
        + "<dc:description>some test description</dc:description>"
        + "<dc:language>zu</dc:language>"
        + "<dc:subject>some test subject</dc:subject>"
        + "<dc:title>some test title</dc:title>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });
  });
});
