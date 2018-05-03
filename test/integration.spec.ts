import { unlink } from "fs";
import { join } from "path";
import { promisify } from "util";
import { HorizontalAlignment } from "../src/style/HorizontalAlignment";
import { Style } from "../src/style/Style";
import { TabStop } from "../src/style/TabStop";
import { TabStopType } from "../src/style/TabStopType";
import { TextDocument } from "../src/TextDocument";

const FILEPATH = "./integration.fodt";

describe("integration", () => {
  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    await unlinkAsync(FILEPATH);

    done();
  });

  it("create a full blown document", async (done) => {
    const document = new TextDocument();

    document.addParagraph().addImage(join(__dirname, "data", "ODF.png"));

    document.addHeading("First heading");
    document.addHeading("Second heading", 2);

    const para1 = document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    para1.addText("\nSome more text");
    para1.setStyle(new Style());
    para1.getStyle().setHorizontalAlignment(HorizontalAlignment.Center);

    document.addParagraph();

    const para2 = document.addParagraph("first\tsecond\tthird");
    para2.setStyle(new Style());
    para2.getStyle().addTabStop(new TabStop(4));
    para2.getStyle().addTabStop(new TabStop(12, TabStopType.Right));

    const heading20 = document.addHeading("List");
    heading20.setStyle(new Style());
    heading20.getStyle().setPageBreakBefore();

    const list = document.addList();
    list.addItem("first item");
    list.addItem("second item");

    const heading30 = document.addHeading("Another chapter");
    heading30.setStyle(new Style());
    heading30.getStyle().setPageBreakBefore();

    const para3 = document.addParagraph("This is just an ");
    para3.addHyperlink("example", "http://example.org");
    para3.addText(".");

    await document.saveFlat(FILEPATH);

    // TODO use snapshot testing

    done();
  });
});
