import { join } from "path";
import { Image } from "../../src/draw/Image";
import { AnchorType } from "../../src/style/AnchorType";
import { ImageStyle } from "../../src/style/ImageStyle";
import { TextDocument } from "../../src/TextDocument";

describe(Image.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#setStyle", () => {
    it("set text anchor attribute on frame", () => {
      document.addParagraph().addImage(join(__dirname, "..", "data", "ODF.png"));

      expect(document.toString()).toMatch(/<draw:frame text:anchor-type="paragraph">/);
    });
  });

  describe("#getStyle", () => {
    let image: Image;

    beforeEach(() => {
      image = new Image("somePath");
    });

    it("return style by default", () => {
      expect(image.getStyle()).toBeInstanceOf(ImageStyle);
    });

    it("return previous set style", () => {
      const testStyle = new ImageStyle();
      testStyle.setAnchorType(AnchorType.AsChar);

      image.setStyle(testStyle);

      expect(image.getStyle()).toBe(testStyle);
    });
  });

  describe("#toXml", () => {
    let image: Image;

    beforeEach(() => {
      image = document.addParagraph().addImage(join(__dirname, "..", "data", "ODF.png"));
    });

    it("append a draw frame with image and base64 encoded image", () => {
      const regex = new RegExp("<draw:frame text:anchor-type=\"paragraph\">"
        + "<draw:image>"
        + "<office:binary-data>"
        + ".*"
        + "</office:binary-data>"
        + "</draw:image>"
        + "</draw:frame>");
      expect(document.toString()).toMatch(regex);
    });
  });
});
