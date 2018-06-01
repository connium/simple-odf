import { join } from "path";
import { Image } from "../../src/draw/Image";
import { AnchorType } from "../../src/style/AnchorType";
import { ImageStyle } from "../../src/style/ImageStyle";
import { Paragraph } from "../../src/text/Paragraph";
import { TextDocument } from "../../src/TextDocument";

describe(ImageStyle.name, () => {
  let document: TextDocument;
  let testStyle: ImageStyle;

  beforeEach(() => {
    document = new TextDocument();
    testStyle = new ImageStyle();
  });

  describe("#getAnchorType", () => {
    it("return `Paragraph` as default", () => {
      expect(testStyle.getAnchorType()).toBe(AnchorType.Paragraph);
    });

    it("return the current anchor type", () => {
      testStyle.setAnchorType(AnchorType.AsChar);

      expect(testStyle.getAnchorType()).toBe(AnchorType.AsChar);
    });
  });

  describe("toXml", () => {
    let image: Image;

    it("set the anchor type", () => {
      image = document.addParagraph().addImage(join(__dirname, "..", "data", "ODF.png"));

      image.getStyle().setAnchorType(AnchorType.AsChar);

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="as-char">/);
    });
  });
});
