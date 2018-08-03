import { userInfo } from "os";
import { Meta } from "../../src/meta/Meta";
import { TextDocument } from "../../src/TextDocument";

describe(Meta.name, () => {
  const currentUserName = userInfo().username;

  let meta: Meta;

  beforeEach(() => {
    meta = new Meta();
  });

  describe("#setCreator", () => {
    const testCreator = "Homer Simpson";

    it("return current username by default", () => {
      expect(meta.getCreator()).toBe(currentUserName);
    });

    it("return previous set name", () => {
      meta.setCreator(testCreator);

      expect(meta.getCreator()).toBe(testCreator);
    });

    it("return trimmed name", () => {
      meta.setCreator(" Homer Simpson ");

      expect(meta.getCreator()).toBe(testCreator);
    });

    it("return current username if an empty name is set", () => {
      meta.setCreator("Homer Simpson");
      meta.setCreator("");

      expect(meta.getCreator()).toBe(userInfo().username);
    });
  });

  describe("#setDescription", () => {
    const testDescription = "some test description";

    it("return undefined by default", () => {
      expect(meta.getDescription()).toBeUndefined();
    });

    it("return previous set description", () => {
      meta.setDescription(testDescription);

      expect(meta.getDescription()).toBe(testDescription);
    });

    it("return trimmed description", () => {
      meta.setDescription(" some test description ");

      expect(meta.getDescription()).toBe(testDescription);
    });

    it("return undefined if empty description is set", () => {
      meta.setDescription(" ");

      expect(meta.getDescription()).toBeUndefined();
    });

    it("return undefined if undefined is set", () => {
      meta.setDescription(undefined);

      expect(meta.getDescription()).toBeUndefined();
    });
  });

  describe("#setKeywords", () => {
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

    it("add trimmed keyword", () => {
      meta.addKeyword(" some keyword ");

      expect(meta.getKeywords()).toEqual([testKeyword1]);
    });

    it("ignore empty keyword", () => {
      meta.addKeyword(" ");

      expect(meta.getKeywords()).toEqual([]);
    });

    it("remove keyword from list", () => {
      meta.addKeyword(testKeyword1);
      meta.addKeyword(testKeyword2);

      expect(meta.getKeywords()).toEqual([testKeyword1, testKeyword2]);

      meta.removeKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword2]);

      meta.removeKeyword(testKeyword1);

      expect(meta.getKeywords()).toEqual([testKeyword2]);
    });
  });

  describe("#setLanguage", () => {
    const testLanguage = "zu";

    it("return undefined by default", () => {
      expect(meta.getLanguage()).toBeUndefined();
    });

    it("return previous set language", () => {
      meta.setLanguage(testLanguage);

      expect(meta.getLanguage()).toBe(testLanguage);
    });

    it("ignore value if an invalid language is given", () => {
      meta.setLanguage(testLanguage);
      meta.setLanguage("invalid");

      expect(meta.getLanguage()).toBe(testLanguage);
    });
  });

  describe("#setSubject", () => {
    const testSubject = "some test subject";

    it("return undefined by default", () => {
      expect(meta.getSubject()).toBeUndefined();
    });

    it("return previous set subject", () => {
      meta.setSubject(testSubject);

      expect(meta.getSubject()).toBe(testSubject);
    });

    it("return trimmed subject", () => {
      meta.setSubject(" some test subject ");

      expect(meta.getSubject()).toBe(testSubject);
    });

    it("return undefined if empty subject is set", () => {
      meta.setSubject(" ");

      expect(meta.getSubject()).toBeUndefined();
    });
  });

  describe("#setTitle", () => {
    const testTitle = "some test title";

    it("return undefined by default", () => {
      expect(meta.getTitle()).toBeUndefined();
    });

    it("return previous set title", () => {
      meta.setTitle(testTitle);

      expect(meta.getTitle()).toBe(testTitle);
    });

    it("return trimmed title", () => {
      meta.setTitle(" some test title ");

      expect(meta.getTitle()).toBe(testTitle);
    });

    it("return undefined if empty title is set", () => {
      meta.setTitle(" ");

      expect(meta.getTitle()).toBeUndefined();
    });
  });

  describe("#toXml", () => {
    let document: TextDocument;

    beforeEach(() => {
      document = new TextDocument();
    });

    it("append creator, date, creation-date, editing-cycles and generator as default properties", () => {
      const regex = new RegExp("<office:meta>"
        + "<meta:initial-creator>" + userInfo().username + "</meta:initial-creator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<dc:creator>" + userInfo().username + "</dc:creator>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
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
        + "<meta:initial-creator>" + userInfo().username + "</meta:initial-creator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<dc:creator>" + userInfo().username + "</dc:creator>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
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
        + "<meta:initial-creator>" + userInfo().username + "</meta:initial-creator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<dc:creator>Homer Simpson</dc:creator>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "<dc:title>some test title</dc:title>"
        + "<dc:subject>some test subject</dc:subject>"
        + "<dc:description>some test description</dc:description>"
        + "<dc:language>zu</dc:language>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });

    it("append description, keywords, subject", () => {
      document.getMeta().setDescription("some test description");
      document.getMeta().addKeyword("some keyword");
      document.getMeta().addKeyword("some other keyword");
      document.getMeta().setSubject("some test subject");

      const regex = new RegExp("<office:meta>"
        + "<meta:initial-creator>" + userInfo().username + "</meta:initial-creator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<dc:creator>" + userInfo().username + "</dc:creator>"
        + "<dc:date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</dc:date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "<dc:subject>some test subject</dc:subject>"
        + "<meta:keyword>some keyword</meta:keyword>"
        + "<meta:keyword>some other keyword</meta:keyword>"
        + "<dc:description>some test description</dc:description>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "</office:meta>");
      expect(document.toString()).toMatch(regex);
    });
  });
});
