import { ParagraphStyle } from "./ParagraphStyle";
import { Paragraph } from "../text/Paragraph";
import { TextDocument } from "../TextDocument";

describe(ParagraphStyle.name, () => {
  let document: TextDocument;
  let paragraph: Paragraph;
  let testStyle: ParagraphStyle;

  beforeEach(() => {
    document = new TextDocument();
    paragraph = document.addParagraph("test");
    testStyle = new ParagraphStyle();
  });

  it("not set a style if it is default", () => {
    paragraph.setStyle(testStyle);

    expect(document.toString()).not.toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)">/);
  });

  it("create `automatic-styles` and `style` elements", () => {
    testStyle.setPageBreakBefore();

    paragraph.setStyle(testStyle);

    /* tslint:disable-next-line:max-line-length */
    expect(document.toString()).toMatch(/<office:automatic-styles><style:style style:family="paragraph" style:name="([a-z0-9]+)">/);
  });

  it("set a style", () => {
    testStyle.setPageBreakBefore();

    paragraph.setStyle(testStyle);

    expect(document.toString()).toMatch(/<style:style style:family="paragraph" style:name="([a-z0-9]+)">/);
  });

  it("not duplicate styles", () => {
    testStyle.setPageBreakBefore();

    paragraph.setStyle(testStyle);
    document.addParagraph().setStyle(testStyle);

    /* tslint:disable-next-line:max-line-length */
    expect(document.toString()).toMatch(/<office:automatic-styles><style:style style:family="paragraph" style:name="([a-z0-9]+)"><style:paragraph-properties fo:break-before="page"\/><\/style:style><\/office:automatic-styles>/);
  });
});
