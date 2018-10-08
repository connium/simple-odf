import { userInfo } from "os";
import { Meta } from "../../src/meta/Meta";
import { TextDocument } from "../../src/TextDocument";

describe(Meta.name, () => {
  const currentUserName = userInfo().username;

  let meta: Meta;

  beforeEach(() => {
    meta = new Meta();
  });

  describe("creation date", () => {
    it("return current date", () => {
      expect(meta.getCreationDate()).toBeGreaterThan(Date.now() - 10);
    });
  });

  describe("creator", () => {
    const testCreator = "Homer Simpson";

    it("return current user by default", () => {
      expect(meta.getCreator()).toBe(userInfo().username);
    });

    it("return previous set creator", () => {
      meta.setCreator(testCreator);

      expect(meta.getCreator()).toBe(testCreator);
    });

    it("return undefined if undefined is set", () => {
      meta.setCreator(testCreator);
      meta.setCreator(undefined);

      expect(meta.getCreator()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setCreator(testCreator);
      meta.setCreator(null);

      expect(meta.getCreator()).toBe(testCreator);
    });
  });

  describe("date", () => {
    const testDate = Date.UTC(2020, 3, 1, 12);

    it("return current date by default", () => {
      const now = Date.now();

      expect(meta.getDate()).toBeGreaterThan(now - 10);
      expect(meta.getDate()).toBeLessThanOrEqual(now);
    });

    it("return previous set date", () => {
      meta.setDate(testDate);

      expect(meta.getDate()).toBe(testDate);
    });

    it("return undefined if undefined is set", () => {
      meta.setDate(testDate);
      meta.setDate(undefined);

      expect(meta.getDate()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setDate(testDate);
      meta.setDate(null);

      expect(meta.getDate()).toBe(testDate);
    });

    it("ignore dates earlier than now", () => {
      meta.setDate(testDate);
      meta.setDate(Date.UTC(2000, 11, 24, 13, 37, 23, 42));

      expect(meta.getDate()).toBe(testDate);
    });
  });

  describe("description", () => {
    const testDescription = "some test description";

    it("return undefined by default", () => {
      expect(meta.getDescription()).toBeUndefined();
    });

    it("return previous set description", () => {
      meta.setDescription(testDescription);

      expect(meta.getDescription()).toBe(testDescription);
    });

    it("return undefined if undefined is set", () => {
      meta.setDescription(testDescription);
      meta.setDescription(undefined);

      expect(meta.getDescription()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setDescription(testDescription);
      meta.setDescription(null);

      expect(meta.getDescription()).toBe(testDescription);
    });
  });

  describe("editing cycles", () => {
    it("return 1", () => {
      expect(meta.getEditingCycles()).toBe(1);
    });
  });

  describe("generator", () => {
    it("return the module name and a version", () => {
      expect(meta.getGenerator()).toMatch(/simple-odf\/\d+\.\d+\.\d+/);
    });
  });

  describe("initial creator", () => {
    const testCreator = "Homer Simpson";

    it("return current user by default", () => {
      expect(meta.getInitialCreator()).toBe(userInfo().username);
    });

    it("return previous set creator", () => {
      meta.setInitialCreator(testCreator);

      expect(meta.getInitialCreator()).toBe(testCreator);
    });

    it("return undefined if undefined is set", () => {
      meta.setInitialCreator(testCreator);
      meta.setInitialCreator(undefined);

      expect(meta.getInitialCreator()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setInitialCreator(testCreator);
      meta.setInitialCreator(null);

      expect(meta.getInitialCreator()).toBe(testCreator);
    });
  });

  describe("keywords", () => {
    const testKeyword1 = "some keyword";
    const testKeyword2 = "some other keyword";

    it("return empty list by default", () => {
      expect(meta.getKeywords()).toEqual([]);
    });

    it("add key word to list", () => {
      meta.addKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword1]);

      meta.addKeyword(testKeyword2);

      expect(meta.getKeywords()).toEqual([testKeyword1, testKeyword2]);
    });

    it("split string by comma and add multiple keywords", () => {
      meta.addKeyword(" some , more, keywords ");

      expect(meta.getKeywords()).toEqual([" some ", " more", " keywords "]);
    });

    it("ignore invalid input", () => {
      meta.addKeyword(undefined);

      expect(meta.getKeywords()).toEqual([]);

      meta.addKeyword(null);

      expect(meta.getKeywords()).toEqual([]);
    });

    it("remove keyword from list", () => {
      meta.addKeyword(testKeyword1);
      meta.addKeyword(testKeyword2);
      meta.addKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword1, testKeyword2, testKeyword1]);

      meta.removeKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword2]);

      meta.removeKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword2]);
    });

    it("clear keyword list", () => {
      meta.addKeyword(testKeyword1);
      meta.addKeyword(testKeyword2);
      meta.addKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword1, testKeyword2, testKeyword1]);

      meta.clearKeywords();

      expect(meta.getKeywords()).toEqual([]);
    });
  });

  describe("language", () => {
    const testLanguage = "zu";

    it("return undefined by default", () => {
      expect(meta.getLanguage()).toBeUndefined();
    });

    it("return previous set language", () => {
      meta.setLanguage(testLanguage);

      expect(meta.getLanguage()).toBe(testLanguage);
    });

    it("return undefined if undefined is set", () => {
      meta.setLanguage(testLanguage);
      meta.setLanguage(undefined);

      expect(meta.getLanguage()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setLanguage(testLanguage);
      meta.setLanguage("invalid");

      expect(meta.getLanguage()).toBe(testLanguage);
    });
  });

  describe("print date", () => {
    const testDate = Date.UTC(2020, 3, 1, 12);

    it("return undefined by default", () => {
      expect(meta.getPrintDate()).toBeUndefined();
    });

    it("return previous set date", () => {
      meta.setPrintDate(testDate);

      expect(meta.getPrintDate()).toBe(testDate);
    });

    it("return undefined if undefined is set", () => {
      meta.setPrintDate(testDate);
      meta.setPrintDate(undefined);

      expect(meta.getPrintDate()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setPrintDate(testDate);
      meta.setPrintDate(null);

      expect(meta.getPrintDate()).toBe(testDate);
    });

    it("ignore dates earlier than now", () => {
      meta.setPrintDate(testDate);
      meta.setPrintDate(Date.UTC(2000, 11, 24, 13, 37, 23, 42));

      expect(meta.getPrintDate()).toBe(testDate);
    });
  });

  describe("printed by", () => {
    const testUsername = "Lisa Simpson";

    it("return undefined by default", () => {
      expect(meta.getPrintedBy()).toBeUndefined();
    });

    it("return previous set printed by", () => {
      meta.setPrintedBy(testUsername);

      expect(meta.getPrintedBy()).toBe(testUsername);
    });

    it("return undefined if undefined is set", () => {
      meta.setPrintedBy(testUsername);
      meta.setPrintedBy(undefined);

      expect(meta.getPrintedBy()).toBeUndefined();
    });

    it("return undefined if empty printed by is set", () => {
      meta.setPrintedBy(testUsername);
      meta.setPrintedBy(null);

      expect(meta.getPrintedBy()).toBe(testUsername);
    });
  });

  describe("subject", () => {
    const testSubject = "some test subject";

    it("return undefined by default", () => {
      expect(meta.getSubject()).toBeUndefined();
    });

    it("return previous set subject", () => {
      meta.setSubject(testSubject);

      expect(meta.getSubject()).toBe(testSubject);
    });

    it("return undefined if undefined is set", () => {
      meta.setSubject(testSubject);
      meta.setSubject(undefined);

      expect(meta.getSubject()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setSubject(testSubject);
      meta.setSubject(null);

      expect(meta.getSubject()).toBe(testSubject);
    });
  });

  describe("title", () => {
    const testTitle = "some test title";

    it("return undefined by default", () => {
      expect(meta.getTitle()).toBeUndefined();
    });

    it("return previous set title", () => {
      meta.setTitle(testTitle);

      expect(meta.getTitle()).toBe(testTitle);
    });

    it("return undefined if undefined is set", () => {
      meta.setTitle(testTitle);
      meta.setTitle(undefined);

      expect(meta.getTitle()).toBeUndefined();
    });

    it("ignore invalid input", () => {
      meta.setTitle(testTitle);
      meta.setTitle(null);

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
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "<meta:initial-creator>" + userInfo().username + "</meta:initial-creator>"
        + "<dc:creator>" + userInfo().username + "</dc:creator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });

    it("ignore description, language, subject, title if they are empty", () => {
      document.getMeta()
        .setCreator("")
        .setDate(undefined)
        .setDescription("")
        .setInitialCreator("")
        .setLanguage("")
        .setSubject("")
        .setTitle("");

      const regex = new RegExp("<office:meta>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });

    it("append elements if they are set", () => {
      document.getMeta()
        .setCreator("Homer Simpson")
        .setDate(Date.UTC(2020, 11, 24, 13, 37, 23, 42))
        .setDescription("some test description")
        .setInitialCreator("Marge Simpson")
        .addKeyword("some keyword")
        .addKeyword("some other keyword")
        .setLanguage("zu")
        .setPrintDate(Date.UTC(2021, 3, 1))
        .setPrintedBy("Maggie Simpson")
        .setSubject("some test subject")
        .setTitle("some test title")
        ;

      const regex = new RegExp("<office:meta>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "<dc:title>some test title</dc:title>"
        + "<dc:description>some test description</dc:description>"
        + "<dc:subject>some test subject</dc:subject>"
        + "<meta:keyword>some keyword</meta:keyword>"
        + "<meta:keyword>some other keyword</meta:keyword>"
        + "<meta:initial-creator>Marge Simpson</meta:initial-creator>"
        + "<dc:creator>Homer Simpson</dc:creator>"
        + "<meta:printed-by>Maggie Simpson</meta:printed-by>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<dc:date>2020-12-24T13:37:23.042Z</dc:date>"
        + "<meta:print-date>2021-04-01T00:00:00.000Z</meta:print-date>"
        + "<dc:language>zu</dc:language>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });
  });
});
