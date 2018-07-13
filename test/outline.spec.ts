import { unlink } from "fs";
import { promisify } from "util";
import { Color } from "../src/style/Color";
import { NumberingFormat } from "../src/style/NumberingFormat";
import { ParagraphStyle } from "../src/style/ParagraphStyle";
import { TextDocument } from "../src/TextDocument";

const FILEPATH = "./integration.fodt";

describe("outline", () => {
  let document: TextDocument;

  beforeAll(() => {
    document = new TextDocument();
  });

  afterAll(async (done) => {
    const unlinkAsync = promisify(unlink);

    // await unlinkAsync(FILEPATH);

    done();
  });

  it("", async (done) => {
    const outlineStyle = document.getOutlineStyle();
    outlineStyle.getOutlineLevelStyle(1).setNumberingFormat(NumberingFormat.Numeric);
    outlineStyle.getOutlineLevelStyle(2).setNumberingFormat(NumberingFormat.Numeric);
    outlineStyle.getOutlineLevelStyle(3).setNumberingFormat(NumberingFormat.Numeric);

    const headlineStyle = new ParagraphStyle();
    headlineStyle.setColor(Color.fromRgb(255, 0, 0));

    document.addHeading("First heading").setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    document.addHeading("Second heading", 2).setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    document.addHeading("Third heading", 3).setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    document.addHeading("Fourth heading", 4).setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");

    document.addHeading("First heading").setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    document.addHeading("Second heading", 2).setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    document.addHeading("Third heading", 3).setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");
    document.addHeading("Fourth heading", 4).setStyle(headlineStyle);
    document.addParagraph("The quick, brown fox jumps over a lazy dog.");

    await document.saveFlat(FILEPATH);

    done();
  });
});
