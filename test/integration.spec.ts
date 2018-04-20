import { readFile, unlink } from "fs";
import { join } from "path";
import { promisify } from "util";
import { HorizontalAlignment } from "../src/style/HorizontalAlignment";
import { TextDocument, XML_DECLARATION } from "../src/TextDocument";

const FILEPATH = "./integration.fodt";

describe(TextDocument.name, () => {
  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    await unlinkAsync(FILEPATH);

    done();
  });

  it("create a full blown document", async (done) => {
    const document = new TextDocument();

    document.addHeading("First heading");
    document.addHeading("Second heading", 2);

    const para1 = document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    para1.appendText("\nSome more text");
    para1.setHorizontalAlignment(HorizontalAlignment.Center);

    const heading20 = document.addHeading("List");
    heading20.setPageBreak();

    const list = document.addList();
    list.addItem("first item");
    list.addItem("second item");

    const heading30 = document.addHeading("Another chapter");
    heading30.setPageBreak();

    const para2 = document.addParagraph("This is just an ");
    para2.appendHyperlink("example", "http://example.org");
    para2.appendText(".");

    document.addParagraph().appendImage(join(__dirname, "data", "image.png"));

    await document.saveFlat(FILEPATH);
    done();
  });
});
