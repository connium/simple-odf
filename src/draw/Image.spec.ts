import { join } from "path";
import { Image } from "./Image";
import { AnchorType } from "../style/AnchorType";
import { ImageStyle } from "../style/ImageStyle";
import { TextDocument } from "../TextDocument";

describe(Image.name, () => {
  let document: TextDocument;

  beforeEach(() => {
    document = new TextDocument();
  });

  describe("#setStyle", () => {
    it("set text anchor attribute on frame", () => {
      document.addParagraph().addImage(join(__dirname, "..", "..", "test", "data", "ODF.png"));

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
    beforeEach(() => {
      document.addParagraph().addImage(join(__dirname, "..", "..", "test", "data", "ODF.png"));
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
