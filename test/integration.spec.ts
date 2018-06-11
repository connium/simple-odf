import { unlink } from "fs";
import { join } from "path";
import { promisify } from "util";
import { AnchorType } from "../src/style/AnchorType";
import { Color } from "../src/style/Color";
import { FontPitch } from "../src/style/FontPitch";
import { HorizontalAlignment } from "../src/style/HorizontalAlignment";
import { ParagraphStyle } from "../src/style/ParagraphStyle";
import { TabStop } from "../src/style/TabStop";
import { TabStopType } from "../src/style/TabStopType";
import { TextTransformation } from "../src/style/TextTransformation";
import { Typeface } from "../src/style/Typeface";
import { TextDocument } from "../src/TextDocument";

const FILEPATH = "./integration.fodt";

xdescribe("integration", () => {
  let document: TextDocument;

  beforeAll(() => {
    document = new TextDocument();
  });

  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    await unlinkAsync(FILEPATH);

    done();
  });

  it("image", () => {
    const paragraph = document.addParagraph();
    paragraph.setStyle(new ParagraphStyle());
    paragraph.getStyle().setHorizontalAlignment(HorizontalAlignment.Center);

    const image = paragraph.addImage(join(__dirname, "data", "ODF.png"));
    image.getStyle().setAnchorType(AnchorType.AsChar);
    image.getStyle().setSize(29.4, 36.5);
  });

  it("add heading", () => {
    document.addHeading("First heading");
    document.addHeading("Second heading", 2);

    const para = document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    para.addText("\nSome more text");
  });

  describe("paragraph formatting", () => {
    it("page break", () => {
      const heading = document.addHeading("Paragraph Formatting", 2);
      heading.setStyle(new ParagraphStyle());
      heading.getStyle().setPageBreakBefore();
    });

    it("keep together", () => {
      const heading = document.addParagraph("Paragraph Formatting");
      heading.setStyle(new ParagraphStyle());
      heading.getStyle().setKeepTogether();
    });

    it("align text", () => {
      const paragraph = document.addParagraph("Some centered text");
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setHorizontalAlignment(HorizontalAlignment.Center);
    });

    it("tab stops", () => {
      const paragraph = document.addParagraph("first\tsecond\tthird");
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().addTabStop(new TabStop(4));
      paragraph.getStyle().addTabStop(new TabStop(12, TabStopType.Right));
    });
  });

  describe("text formatting", () => {
    beforeAll(() => {
      const heading = document.addHeading("Text Formatting", 2);
      heading.setStyle(new ParagraphStyle());
      heading.getStyle().setPageBreakBefore();
    });

    it("color", () => {
      const paragraph = document.addParagraph("Some mint-colored text");
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setColor(Color.fromRgb(62, 180, 137));
    });

    it("font name", () => {
      document.declareFont("Open Sans", "Open Sans", FontPitch.Variable);

      const paragraph = document.addParagraph("Open Sans");
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setFontName("Open Sans");
    });

    it("font size", () => {
      const paragraph = document.addParagraph("Some small text");
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setFontSize(8);
    });

    it("text transformation", () => {
      const paragraph = document.addParagraph("Some uppercase text");
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setTextTransformation(TextTransformation.Uppercase);
    });

    it("typeface", () => {
      const paragraph = document.addParagraph("Some bold text");
      paragraph.setStyle(new ParagraphStyle());
      paragraph.getStyle().setTypeface(Typeface.Bold);
    });
  });

  it("hyperlink", () => {
    const heading = document.addHeading("Hyperlink", 2);
    heading.setStyle(new ParagraphStyle());
    heading.getStyle().setPageBreakBefore();

    const paragraph = document.addParagraph("This is just an ");
    paragraph.addHyperlink("example", "http://example.org");
    paragraph.addText(".");
  });

  it("list", () => {
    const heading = document.addHeading("List", 2);
    heading.setStyle(new ParagraphStyle());
    heading.getStyle().setPageBreakBefore();

    const list = document.addList();
    list.addItem("first item");
    list.addItem("second item");
  });

  it("save document", async (done) => {
    await document.saveFlat(FILEPATH);

    // TODO use snapshot testing

    done();
  });
});
