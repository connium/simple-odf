import { readFile, unlink } from "fs";
import { promisify } from "util";
import { HorizontalAlignment } from "../src/style/HorizontalAlignment";
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

  it("return the basis document", () => {
    const result = document.toString();

    expect(result).toEqual(XML_DECLARATION + baseDocument);
  });

  it("write a flat document", async (done) => {
    const readFileAsync = promisify(readFile);

    await document.saveFlat(FILEPATH);

    const fileContents = await readFileAsync(FILEPATH, "utf8");

    expect(fileContents).toEqual(XML_DECLARATION + baseDocument);
    done();
  });
});
