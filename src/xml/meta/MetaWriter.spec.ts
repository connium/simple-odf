import { userInfo } from "os";
import { DOMImplementation, XMLSerializer } from "xmldom";
import { Meta } from "../../api/meta";
import { OdfElementName } from "../OdfElementName";
import { MetaWriter } from "./MetaWriter";

describe(MetaWriter.name, () => {
  describe("#write", () => {
    let metaWriter: MetaWriter;
    let testDocument: Document;
    let testRoot: Element;
    let meta: Meta;

    beforeEach(() => {
      testDocument = new DOMImplementation().createDocument("someNameSpace", OdfElementName.OfficeDocument, null);
      testRoot = testDocument.firstChild as Element;
      meta = new Meta();

      metaWriter = new MetaWriter();
    });

    it("append creator, date, creation-date, editing-cycles and generator as default properties", () => {
      metaWriter.write(testDocument, testRoot, meta);

      const documentAsString = new XMLSerializer().serializeToString(testDocument);
      const regex = new RegExp("<office:meta>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "<meta:initial-creator>" + userInfo().username + "</meta:initial-creator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "</office:meta>");
      expect(documentAsString).toMatch(regex);
    });

    it("ignore description, language, subject, title if they are empty", () => {
      meta.setCreator("")
        .setDate(undefined)
        .setDescription("")
        .setInitialCreator("")
        .setLanguage("")
        .setSubject("")
        .setTitle("");

      metaWriter.write(testDocument, testRoot, meta);

      const documentAsString = new XMLSerializer().serializeToString(testDocument);
      const regex = new RegExp("<office:meta>"
        + "<meta:generator>simple-odf/\\d\\.\\d+\\.\\d+</meta:generator>"
        + "<meta:creation-date>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z</meta:creation-date>"
        + "<meta:editing-cycles>1</meta:editing-cycles>"
        + "</office:meta>");
      expect(documentAsString).toMatch(regex);
    });

    it("append elements if they are set", () => {
      meta.setCreator("Homer Simpson")
        .setDate(new Date(Date.UTC(2020, 11, 24, 13, 37, 23, 42)))
        .setDescription("some test description")
        .setInitialCreator("Marge Simpson")
        .addKeyword("some keyword")
        .addKeyword("some other keyword")
        .setLanguage("zu")
        .setPrintDate(new Date(Date.UTC(2021, 3, 1)))
        .setPrintedBy("Maggie Simpson")
        .setSubject("some test subject")
        .setTitle("some test title")
        ;

      metaWriter.write(testDocument, testRoot, meta);

      const documentAsString = new XMLSerializer().serializeToString(testDocument);
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
      expect(documentAsString).toMatch(regex);
    });
  });
});
