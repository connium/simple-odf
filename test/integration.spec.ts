import { unlink } from "fs";
import { join } from "path";
import { promisify } from "util";
import { Color } from "../src/style/Color";
import { HorizontalAlignment } from "../src/style/HorizontalAlignment";
import { Style } from "../src/style/Style";
import { TabStop } from "../src/style/TabStop";
import { TabStopType } from "../src/style/TabStopType";
import { Typeface } from "../src/style/Typeface";
import { TextDocument } from "../src/TextDocument";

const FILEPATH = "./integration.fodt";

xdescribe("integration", () => {
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

    let para = document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    para.addText("\nSome more text");

    document.addParagraph();

    para = document.addParagraph("first\tsecond\tthird");
    para.getStyle().addTabStop(new TabStop(4));
    para.getStyle().addTabStop(new TabStop(12, TabStopType.Right));

    const heading20 = document.addHeading("List");
    heading20.getStyle().setPageBreakBefore();

    const list = document.addList();
    list.addItem("first item");
    list.addItem("second item");

    const heading30 = document.addHeading("Another chapter");
    heading30.getStyle().setPageBreakBefore();

    para = document.addParagraph("This is just an ");
    para.addHyperlink("example", "http://example.org");
    para.addText(".");

    const heading40 = document.addHeading("Style & Formatting");
    heading40.getStyle().setPageBreakBefore();

    const heading41 = document.addHeading("Font", 2);

    para = document.addParagraph("Some bold text");
    para.getTextStyle().setTypeface(Typeface.Bold);
    para = document.addParagraph("Some small text");
    para.getTextStyle().setFontSize(8);
    para = document.addParagraph("Some colored text");
    para.getTextStyle().setColor(Color.fromHex("336699"));

    document.addHeading("Paragraph", 2);

    para = document.addParagraph("Some centered text");
    para.getStyle().setHorizontalAlignment(HorizontalAlignment.Center);

    await document.saveFlat(FILEPATH);

    // TODO use snapshot testing

    done();
  });
});
