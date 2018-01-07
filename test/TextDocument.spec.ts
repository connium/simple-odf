import { readFile, unlink } from "fs";
import { promisify } from "util";
import { HorizontalAlignment } from "../src/style/HorizontalAlignment";
import { TextDocument, XML_DECLARATION } from "../src/TextDocument";

const FILEPATH_1 = "./test.fodt";
const FILEPATH_2 = "./test2.fodt";

describe(TextDocument.name, () => {
  /* tslint:disable-next-line:max-line-length */
  const baseDocument = '<office:document office:mimetype="application/vnd.oasis.opendocument.text" office:version="1.2" xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0"><office:body><office:text/></office:body></office:document>';
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    await unlinkAsync(FILEPATH_1);
    await unlinkAsync(FILEPATH_2);

    done();
  });

  it("return the basis document", () => {
    const result = document.toString();

    expect(result).toEqual(baseDocument);
  });

  it("write a flat document", async (done) => {
    const readFileAsync = promisify(readFile);

    await document.saveFlat(FILEPATH_1);

    const fileContents = await readFileAsync(FILEPATH_1, "utf8");

    expect(fileContents).toEqual(XML_DECLARATION + baseDocument);
    done();
  });

  it("create a full blown document", async (done) => {
    document.addHeadline("First headline");
    document.addHeadline("Second headline", 2);

    const para1 = document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    para1.appendTextContent("\nSome more text");
    para1.setHorizontalAlignment(HorizontalAlignment.Center);

    const headline20 = document.addHeadline("New chapter");
    headline20.setPageBreak();

    const headline30 = document.addHeadline("Another chapter");
    headline30.setPageBreak();

    await document.saveFlat(FILEPATH_2);
    done();
  });
});
